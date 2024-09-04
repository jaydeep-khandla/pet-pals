import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import Bg from "@/assets/images/bg.jpg";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import UserProfile from '@/components/UserProfile/UserProfile';
import OrgProfile from '@/components/OrgProfile/OrgProfile';
import useAuth from '@/hooks/useAuth';
import { fetchUser } from "@/helperFuncs/userFetch";

const profileComponents = {
  user: UserProfile,
  animal_shelter: OrgProfile,
};

export default function ProfileRoute() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {

    const init = async () => {

      const response = await fetchUser(id);

      if (response?.status === 404) {
        toast.error("User not found");
        navigate(from, { replace: true });
      }

      const data = response?.data;
      if (response?.error) {
        console.error(response?.error);
        return;
      }

      setUserProfile(data);
    }
    init();
  }, []);

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
