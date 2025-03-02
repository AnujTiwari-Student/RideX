import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate , Outlet } from 'react-router';

const UserProtectedWrapper = () => {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if(!isAuthenticated){
        return <Navigate to='/login' replace />
    }

  return <Outlet />
}

export default UserProtectedWrapper
