import { useEffect, useState } from 'react';
import decodeJWT from '@/helperFuncs/decodeJWT'; // Make sure you have this package installed

const useUserInfo = (auth) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = auth?.accessToken;
    if (token) {
      try {
        const user = decodeJWT(token);
        setUserInfo(user);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUserInfo(null);
      }
    } else {
      setUserInfo(null); // Reset user info if there's no token
    }
  }, [auth]);

  return userInfo;
};

export default useUserInfo;
