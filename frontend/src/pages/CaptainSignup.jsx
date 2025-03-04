import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFirstName , setLastName , setEmail , setPassword , setServerResponse , setCapacity , setColor , setPlate , setVehicleType } from "../features/captainSlice";
import '../App.css';
import { loginSuccess } from "../features/captainAuthSlice";

const CaptainSignup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {fullname, email, password , vehicle } = useSelector(state => state.captain);

  const formHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname: fullname.firstname.trim(),
        lastname: fullname.lastname.trim(),
      },
      email: email.trim(),
      password: password.trim(),
      vehicle: {
        color: vehicle.color.trim(),
        plate: vehicle.plate.trim(),
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType.trim()
      }
    }

    try{
      console.log("Sending registration request:", newCaptain);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, newCaptain);
      console.log("Backend response:", response);

      localStorage.setItem("captainToken", response.data.token);
      dispatch(loginSuccess({token: response.data.token}));

      if(response.status === 201){
        console.log("Registration successful, navigating to /captain-account");
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
                name="color"
                value={password}
                onChange={(e) => {
                  dispatch(setPassword(e.target.value));
                }}
                placeholder="Password"
                required
                className="border-1 border-gray-400 rounded-md px-4 w-full outline-none py-2 mt-2"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="vehicle" className="text-xl font-semibold">
                Vehicle
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  id="color"
                  type="text"
                  name="color"
                  value={vehicle.color}
                  onChange={(e) => {
                    dispatch(setColor(e.target.value));
                  }}
                  placeholder="Color"
                  required
                  className="border-1 border-gray-400 rounded-md px-4 w-full outline-none py-2 mt-2"
                />
                <input
                  id="plate"
                  type="text"
                  name="plate"
                  value={vehicle.plate}
                  onChange={(e) => {
                    dispatch(setPlate(e.target.value));
                  }}
                  placeholder="Number"
                  required
                  className="border-1 border-gray-400 rounded-md px-4 w-full outline-none py-2 mt-2"
                />
                <input
                  id="capacity"
                  type="number"
                  name="capacity"
                  value={vehicle.capacity}
                  onChange={(e) => {
                    dispatch(setCapacity(e.target.value));
                  }}
                  placeholder="Capacity"
                  required
                  className="border-1 border-gray-400 rounded-md px-4 w-full outline-none py-2 mt-2"
                />
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={vehicle.vehicleType}
                  onChange={(e) => {
                    dispatch(setVehicleType(e.target.value));
                  }}
                  required
                  className="border-1 border-gray-400 rounded-md px-4 w-full outline-none py-2 mt-2"
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="car">Car</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
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
