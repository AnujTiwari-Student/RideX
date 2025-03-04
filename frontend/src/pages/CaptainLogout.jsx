import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("captainToken")

    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            console.log("Logout successful");
            localStorage.removeItem("captainToken");
            navigate("/captain-login");
        }
    })
    

  return (
    <div>
      CaptainLogout
    </div>
  )
}

export default CaptainLogout
