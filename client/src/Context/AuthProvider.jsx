import { createContext, useEffect, useState } from "react";
import decodeJWT from '@/helperFuncs/decodeJWT';

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loggingOut, setLoggingOut] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = auth?.accessToken;
        if (token) {
            try {
                const user = decodeJWT(token);
                setUser(user);
            } catch (error) {
                console.error("Failed to decode token:", error);
                setUser(null);
            }
        } else {
            setUser(null); // Reset user info if there's no token
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loggingOut, setLoggingOut, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;