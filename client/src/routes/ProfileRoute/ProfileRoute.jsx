import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import Bg from "@/assets/images/bg.jpg";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import UserProfile from '@/components/UserProfile/UserProfile';
import OrgProfile from '@/components/OrgProfile/OrgProfile';
import useAuth from '@/hooks/useAuth';
// import decodeJWT from '@/helperFuncs/decodeJWT';
import { fetchProfile } from "@/helperFuncs/profileFetch";
import useUserInfo from '@/hooks/useUserInfo';

const profileComponents = {
  user: UserProfile,
  animal_shelter: OrgProfile,
};

export default function ProfileRoute() {
  const { auth } = useAuth();
  // const [user, setUser] = useState(null);
  const user = useUserInfo(auth);
  const [userProfile, setUserProfile] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  async function init() {

    const response = await fetchProfile(id);

    if (response?.status === 404) {
      toast.error("User not found");
      navigate(from, { replace: true });
    }

    const data = response?.data;
    if (response?.error) {
      console.error(response?.error);
      return;
    }
    const user = useUserInfo(data?.userToken);
    setUserProfile(user);
  }

  useEffect(() => {
    init();
  }, []);

  // useEffect(() => {
  //   const user = decodeJWT(auth?.accessToken);
  //   setUser(user);
  // }, [auth]);

  const ProfileComponent = profileComponents[user?.userType] || UserProfile;

  return (
    <>
      <Header />
      <section className='flex items-center justify-center' style={{ backgroundImage: `url(${Bg})` }}>
        <ProfileComponent user={userProfile} />
      </section>
      <Footer />
    </>
  );
}
