import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import Bg from "@/assets/images/bg.jpg";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PublicOrgProfile from '@/components/PublicOrgProfile/PublicOrgProfile';
import UserProfile from '@/components/UserProfile/UserProfile';
import { fetchProfile } from "@/helperFuncs/profileFetch";
// import useUserInfo from '@/hooks/useUserInfo';

// const profileComponents = {
//     user: UserProfile,
//     animal_shelter: PublicOrgProfile,
// };

export default function PublicProfile() {
    // const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {

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

            console.log(data);

            // const user = decodeJWT(data?.userToken);
            setUserProfile(data);
        }
        init();
    }, []);

    useEffect(() => {
        console.log('userProfile: ', userProfile);
    }, [userProfile]);

    // useEffect(() => {
    //   const user = decodeJWT(auth?.accessToken);
    //   setUser(user);
    // }, [auth]);

    const profileComponents = {
        user: UserProfile,
        animal_shelter: PublicOrgProfile,
    };

    const ProfileComponent = profileComponents[userProfile?.userType] || PublicOrgProfile;

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
