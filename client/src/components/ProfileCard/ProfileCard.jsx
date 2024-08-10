import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';
import useToggle from '@/hooks/useToggle';

export default function ProfileCard() {

    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const logout = useLogout();
    const { handleToggleClick } = useToggle();

    const signOut = async () => {
        try {
            await logout()

            handleToggleClick('profile')
            await setAuth(() => { return null });

            navigate('/')

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className=' absolute right-0 mt-1 mr-4 flex flex-col gap-1 p-4 bg-[#e8f1ff] rounded-md h-auto w-fit items-center'>
            <Avatar className=" cursor-pointer border-2 border-black" onClick={handleToggleClick('profile')} >
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <p className='text-black font-bold'>{auth?.user?.username}</p>
            <p className='text-black '>{auth?.user?.email}</p>
            <button className="btn join__btn w-52" onClick={() => signOut()}>Logout</button>
        </section>
    );
}
