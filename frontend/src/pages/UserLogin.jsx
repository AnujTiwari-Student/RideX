import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setEmail , setPassword } from '../features/userSlice'
import { loginSuccess , logout } from '../features/authSlice'
import axios from 'axios'

const UserLogin = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {email , password} = useSelector((state) => state.user);

  const formHandler = async (e) => {
    e.preventDefault()
    console.log("Sending login request");
    console.log("Email:", email);
    console.log("Password", password);

    const user = {
      email: email.trim(),
      password: password.trim(),
    }

    try{

      console.log("Sending login request:", user);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, user);
      console.log("Backend response:", response);

      localStorage.setItem("token", response.data.token);

      dispatch(loginSuccess({token: response.data.token}));

      if (response.status === 200) {
        console.log("Login successful, navigating to /account");
        navigate("/account");
        console.log("Resetting form fields...");
        dispatch(setEmail(""));
        dispatch(setPassword(""));
      }
    }catch(error){
      console.error("Error during login:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  }

  return (
    <>
      <div className='flex h-screen justify-between flex-col'>
        <div className='container pt-10 px-6'>
          <form action="" onSubmit={formHandler}>
            <div className='mb-4'>
                <label htmlFor='email' className='text-xl font-semibold'>What's your email address</label>
                <input id='email' type="email" name="email" value={email} onChange={(e)=>{
                  dispatch(setEmail(e.target.value))
                }} required placeholder='email@example.com' className='border-1 border-gray-400 rounded-md px-4 w-full outline-none py-2 mt-2' />
            </div>
            <div className='mb-6'>
                <label htmlFor='password' className='text-xl font-semibold'>Enter password</label>
                <input id='password' type="password" name="password" value={password} onChange={(e)=>{
                  dispatch(setPassword(e.target.value))
                }} placeholder='Password' required className='border-1 border-gray-400 rounded-md px-4 w-full outline-none py-2 mt-2' />
            </div>
            <button className='bg-black w-full rounded-md font-semibold tracking-wider text-center text-white py-[8px]'>Login</button>
          </form>
          <p className='text-center mt-4 font-medium text-base'>New Here ? <Link to="/signup" className='text-blue-500'>Create Account</Link></p>
        </div>
        <div className='container px-6 z-50 mb-4'>
          <Link to="/captain-login" className='flex justify-center items-center mt-4 bg-green-500 w-full rounded-md font-semibold tracking-wider text-center text-white py-[8px]'>Login As Captain</Link>
        </div>
      </div>
    </>
  )
} 

export default UserLogin
