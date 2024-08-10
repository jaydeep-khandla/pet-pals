import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '@/hooks/useRefreshToken';
import useAuth from '@/hooks/useAuth';
import Spinner from '@/assets/images/Spinner.gif';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, loggingOut } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            if (loggingOut) {
                setIsLoading(false);
                return;
            }
            try {
                await refresh()
            } catch (err) {
                console.error(err?.response?.data?.error);
                // toast.error(err.response.data?.error);
            }
            finally {
                setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

    }, [auth?.accessToken]);

    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`);
    //     console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    // }, [isLoading]);

    return (
        <>
            {isLoading ? <img
                src={Spinner}
                className=' w-10 self-center mx-auto block text-white'
                alt="Loading..."
            /> : <Outlet />}
        </>
    );
}
