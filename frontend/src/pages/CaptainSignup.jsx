import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import '../App.css';
import { createCaptain } from "@/features/captainSlice";
import toast from "react-hot-toast";

const CaptainSignup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {loading} = useSelector((state)=> state.captain)

  const [captainData, setCaptainData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    vehicleCapacity: "",
    vehicleColor: "",
    vehiclePlate: "",
    vehicleType: "",
  })

  const handleChange = (event) => {
    setCaptainData({
      ...captainData,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createCaptain(captainData))
    .unwrap()
    .then((res)=>{
      navigate("/captain/dashboard")
      toast.success('Captain registered successfully')
    })
    .catch((err)=>{
      toast.error('Failed to create captain')
    })

  }

  return (
    <>
      <div className="flex h-screen justify-between flex-col">
        <div className="container pt-10 px-6">
          <form action="" onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold">What's your Name</h3>
            <div className="mb-4 flex gap-2 w-full">
              <input
                type="text"
                name="firstname"
                value={captainData.firstname}
                onChange={handleChange}
                required
                placeholder="John"
                className="border-1 border-gray-400 rounded-md px-4 w-1/2 outline-none py-2 mt-2"
              />
              <input
                type="text"
                name="lastname"
                value={captainData.lastname}
                onChange={handleChange}
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
                value={captainData.email}
                onChange={handleChange}
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
                value={captainData.password}
                onChange={handleChange}
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
                  id="vehicleColor"
                  type="text"
                  name="vehicleColor"
                  value={captainData.vehicleColor}
                  onChange={handleChange}
                  placeholder="Color"
                  required
                  className="border-1 border-gray-400 rounded-md px-4 w-full outline-none py-2 mt-2"
                />
                <input
                  id="vehiclePlate"
                  type="text"
                  name="vehiclePlate"
                  value={captainData.vehiclePlate}
                  onChange={handleChange}
                  placeholder="Number"
                  required
                  className="border-1 border-gray-400 rounded-md px-4 w-full outline-none py-2 mt-2"
                />
                <input
                  id="vehicleCapacity"
                  type="number"
                  name="vehicleCapacity"
                  value={captainData.vehicleCapacity}
                  onChange={handleChange}
                  placeholder="Capacity"
                  required
                  className="border-1 border-gray-400 rounded-md px-4 w-full outline-none py-2 mt-2"
                />
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={captainData.vehicleType}
                  onChange={handleChange}
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
