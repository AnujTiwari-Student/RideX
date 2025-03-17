import {
  BellDot,
  Cross,
  Gauge,
  Home,
  Loader,
  LogOut,
  Notebook,
  Settings,
  Timer,
  User,
  Wallet,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import gsap from "gsap";
import { logoutUser } from "@/features/userSlice";
import toast from "react-hot-toast";

const UserNavBar = ({ setMenuOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.captain);

  const loaderRef = useRef(null);

  React.useEffect(() => {
    if (loading) {
      gsap.to(loaderRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "linear",
      });
    } else {
      gsap.killTweensOf(loaderRef.current);
      gsap.set(loaderRef.current, { rotation: 0 });
    }
  }, [loading]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser())
        .unwrap()
        .then((res) => {
          navigate("/login");
          toast.success("User Logout Successfully");
        });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="">
      <div className="bg-yellow-400">
        <div
          onClick={() => {
            setMenuOpen(false);
          }}
          className="flex justify-between items-center w-full p-4"
        >
          <h6 className="text-lg font-semibold">Menu</h6>
          <X />
        </div>

        <div className="flex w-full items-center justify-start gap-6 p-4">
          <div className="h-16 w-16 rounded-full bg-white p-[3px]">
            <img
              className="h-full w-full rounded-full object-cover"
              src="https://staticimg.amarujala.com/assets/images/2023/07/29/21-ka-umara-ma-b-b-ekatarasa-ka-pachha-chha-raha-blka-vathha-ka-gaga_1690637663.png"
              alt="captain-pic"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold">Roshni Walia</h3>
            <div>
              <p className="text-sm font-semibold text-gray-500">
                Trial Member
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-around items-center bg-yellow-400 pt-2 pb-6 px-4 rounded-xl">
          <div className="flex flex-col items-center gap-1">
            <Timer size={24} color="#616162" />
            <h5 className="text-md font-medium">10.2 hr</h5>
            <p className="text-sm font-medium text-gray-700">Online</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Gauge size={24} color="#616162" />
            <h5 className="text-md font-medium">30 KM</h5>
            <p className="text-sm font-medium text-gray-700">Distance</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Notebook size={24} color="#616162" />
            <h5 className="text-md font-medium">20</h5>
            <p className="text-sm font-medium text-gray-700">Rides</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4">
        <ul className="">
          <li className="py-3 flex items-center gap-4 text-lg font-medium">
            <Home color="gray" />
            <p>Home</p>
          </li>
          <li className="py-3 flex items-center gap-4 text-lg font-medium">
            <User color="gray" />
            <p>Profile</p>
          </li>
          <li className="py-3 flex items-center gap-4 text-lg font-medium">
            <Wallet color="gray" />
            <p>My Wallet</p>
          </li>
          <li className="py-3 flex items-center gap-4 text-lg font-medium">
            <BellDot color="gray" />
            <p>Notifications</p>
          </li>
          <li className="py-3 flex items-center gap-4 text-lg font-medium">
            <Settings color="gray" />
            <p>Settings</p>
          </li>
          <div
            onClick={() => handleLogout()}
            className="flex items-center justify-between w-full"
          >
            <li className="py-3 flex items-center gap-4 text-lg font-medium">
              <LogOut color="gray" />
              <p>Logout</p>
            </li>
            <div
              className={`transition-opacity ${
                loading ? "opacity-100" : "opacity-0"
              }`}
            >
              <Loader ref={loaderRef} color="black" />
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default UserNavBar;
