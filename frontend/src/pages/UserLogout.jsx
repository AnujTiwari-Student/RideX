import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            console.log("Logout successful");
            localStorage.removeItem("token");
            navigate("/login");
        }
    })

  return (
    <div>
        UserLogout
    </div>
  )
}

export default UserLogout
