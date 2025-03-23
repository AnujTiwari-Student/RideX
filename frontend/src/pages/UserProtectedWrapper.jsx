import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate , Outlet } from 'react-router';

const UserProtectedWrapper = () => {

    if(!!localStorage.getItem('token') === false){
      return <Navigate to='/login' replace />
    }
    
    const {isAuthenticated} = useSelector((state) => state.user);

    if(!isAuthenticated){
        return <Navigate to='/login' replace />
    }

  return <Outlet />
}

export default UserProtectedWrapper
