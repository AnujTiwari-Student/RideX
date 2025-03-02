import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [formData, setFormData] = useState({
    fullname: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
  });

  const formHandler = (e) => {
    e.preventDefault();
    setFormData({
      fullname: {
        firstName: "",
        lastName: "",
      },
      email: "",
      password: "",
    });
    console.log(formData);
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
                value={formData.fullname.firstName}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    fullname: {
                      ...formData.fullname,
                      firstName: e.target.value,
                    },
                  });
                }}
                required
                placeholder="John"
                className="border-1 border-gray-400 rounded-md px-4 w-1/2 outline-none py-2 mt-2"
              />
              <input
                type="text"
                name="lastname"
                value={formData.fullname.lastName}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    fullname: {
                      ...formData.fullname,
                      lastName: e.target.value,
                    },
                  });
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
                value={formData.email}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  });
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
                value={formData.password}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  });
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
