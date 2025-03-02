import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import { setEmail , setFirstName , setLastName , setPassword , setServerResponse } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/authSlice";

const UserSignup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {fullname , email , password} = useSelector((state) => state.user);

  const formHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: fullname.firstname.trim(),
        lastname: fullname.lastname.trim(),
      },
      email: email.trim(),
      password: password.trim(),
    };

    try {
      console.log("Sending registration request:", newUser);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      console.log("Backend response:", response);

      localStorage.setItem("token", response.data.token);
      dispatch(loginSuccess({token: response.data.token}));

      if (response.status === 201) {
        console.log("Registration successful, navigating to /account");
        dispatch(setServerResponse(response.data));
        navigate("/account");

        console.log("Resetting form fields...");
        dispatch(setFirstName(""));
        dispatch(setLastName(""));
        dispatch(setEmail(""));
        dispatch(setPassword(""));
      }
    }catch(error){
      console.error("Error during registration:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    }
  };

  return (
    <>
      <div className="flex h-screen justify-between flex-col">
        <div className="container pt-10 px-6">
          <form action="" onSubmit={formHandler}>
            <h3 className="text-xl font-semibold">What's your first Name</h3>
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
              <label htmlFor="password" className="text-xl font-semibold">Enter password</label>
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
            Already have an account ?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
        <div className="container px-6 z-50 mb-4">
          <p className="text-[10px]">By proceeding, you concent to get calls, Whatsapp or SMS from RideX</p>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
