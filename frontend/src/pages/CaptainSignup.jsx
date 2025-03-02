import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFirstName , setLastName , setEmail , setPassword , setServerResponse } from "../features/captainSlice";

const CaptainSignup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {fullname, email, password} = useSelector(state => state.captain);

  const formHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname: fullname.firstname.trim(),
        lastname: fullname.lastname.trim(),
      },
      email: email.trim(),
      password: password.trim(),
    }

    try{
      console.log("Sending registration request:", newCaptain);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, newCaptain);
      console.log("Backend response:", response);

      if(response.status === 201){
        console.log("Registration successful, navigating to /account");
        dispatch(setServerResponse(response.data));
        navigate("/captain-account");

        console.log("Resetting form fields...");
        dispatch(setFirstName(""));
        dispatch(setLastName(""));
        dispatch(setEmail(""));
        dispatch(setPassword(""));
      }
    }catch(error){
      console.log("Registration failed:", error);
      dispatch(setServerResponse(error.response.data));
    }
  };

  return (
    <>
      <div className="flex h-screen justify-between flex-col">
        <div className="container pt-10 px-6">
          <form action="" onSubmit={formHandler}>
            <h3 className="text-xl font-semibold">What's your Name</h3>
            <div className="mb-4 flex gap-2 w-full">
              <input
                type="text"
                name="firstname"
                value={fullname.firstname}
                onChange={(e) => {
                  dispatch(setFirstName(e.target.value));
                }}
                required
                placeholder="John"
                className="border-1 border-gray-400 rounded-md px-4 w-1/2 outline-none py-2 mt-2"
              />
              <input
                type="text"
                name="lastname"
                value={fullname.lastname}
                onChange={(e) => {
                  dispatch(setLastName(e.target.value));
                }}
                placeholder="Dave"
                className="border-1 border-gray-400 rounded-md px-4 w-1/2 outline-none py-2 mt-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-xl font-semibold">
                What's your email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  dispatch(setEmail(e.target.value));
                }}
                required
                placeholder="email@example.com"
                className="border-1 border-gray-400 rounded-md px-4 w-full outline-none py-2 mt-2"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="text-xl font-semibold">
                Enter password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  dispatch(setPassword(e.target.value));
                }}
                placeholder="Password"
                required
                className="border-1 border-gray-400 rounded-md px-4 w-full outline-none py-2 mt-2"
              />
            </div>
            <button className="bg-black w-full rounded-md font-semibold tracking-wider text-center text-white py-[8px]">
              Register
            </button>
          </form>
          <p className="text-center mt-4 font-medium text-base">
            Already have a fleet ?{" "}
            <Link to="/captain-login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
        <div className="container px-6 z-50 mb-4">
          <Link
            to="/login"
            className="flex justify-center items-center mt-4 bg-orange-500 w-full rounded-md font-semibold tracking-wider text-center text-white py-[8px]"
          >
            Login As User
          </Link>
        </div>
      </div>
    </>
  );
};

export default CaptainSignup;
