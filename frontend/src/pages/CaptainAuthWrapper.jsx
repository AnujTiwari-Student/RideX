import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const CaptainAuthWrapper = () => {

    const isAuthenticated = useSelector((state) => state.captainAuth.isAuthenticated);

    if(!isAuthenticated){
        return <Navigate to='/captain-login' replace />
    }

  return <Outlet />
}

export default CaptainAuthWrapper
