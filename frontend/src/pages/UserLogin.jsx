import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userSlice";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import gsap from "gsap";

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token && window.location.pathname !== "/account") {
      navigate("/account");
    }
  }, [navigate]);
  

  const { loading } = useSelector((state) => state.user);

  const loaderRef = useRef(null);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (loading && loaderRef.current) {
      gsap.to(loaderRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "linear",
      });
    } else if (loaderRef.current) {
      gsap.killTweensOf(loaderRef.current);
      gsap.set(loaderRef.current, { rotation: 0 });
    }

    return () => {
      if (loaderRef.current) {
        gsap.killTweensOf(loaderRef.current);
      }
    };
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginUser(userData))
      .unwrap()
      .then((res) => {
        navigate("/account");
        toast.success("User logged in successfully");
      })
      .catch((err) => {
        toast.error("Failed to log in, please check your credentials");
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex h-screen justify-between flex-col">
        <div className="container pt-10 px-6">
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="text-xl font-semibold">
                What's your email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={userData.email}
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
                value={userData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="border-1 border-gray-400 rounded-md px-4 w-full outline-none py-2 mt-2"
              />
            </div>
            <button className="bg-black w-full rounded-md font-semibold tracking-wider text-center text-white py-[8px]">
              {loading ? (
                <div
                  ref={loaderRef}
                  className="flex w-full items-center justify-center"
                >
                  <Loader size={24} />
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="text-center mt-4 font-medium text-base">
            New Here ?{" "}
            <Link to="/signup" className="text-blue-500">
              Create Account
            </Link>
          </p>
        </div>
        <div className="container px-6 z-50 mb-4">
          <Link
            to="/captain-login"
            className="flex justify-center items-center mt-4 bg-green-500 w-full rounded-md font-semibold tracking-wider text-center text-white py-[8px]"
          >
            Login As Captain
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
