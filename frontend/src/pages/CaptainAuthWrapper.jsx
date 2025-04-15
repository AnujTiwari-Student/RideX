import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const CaptainAuthWrapper = () => {

    if(!!localStorage.getItem('captainToken') === false){
        return <Navigate to='/captain-login' replace />
    }

    const {isAuthenticated} = useSelector((state) => state.captain);

    if(!isAuthenticated){
        return <Navigate to='/captain-login' replace />
    }

  return <Outlet />
}

export default CaptainAuthWrapper
