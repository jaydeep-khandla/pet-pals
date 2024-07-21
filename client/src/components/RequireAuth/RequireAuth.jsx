import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

export default function RequireAuth() {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.user
            ? <Outlet />
            : <Navigate to='/auth' state={{ from: location }} replace />
    );
}
