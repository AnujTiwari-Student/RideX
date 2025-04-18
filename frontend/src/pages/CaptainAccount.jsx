import React, { useEffect, useRef, useState } from "react";
import {
  Phone,
  Map,
  Shield,
  Star,
  Notebook,
  ChevronRight,
  Gauge,
  Timer,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo/logo.jpeg";
import CaptainDetail from "@/components/CaptainDetail";
import mapImage from "../assets/image/Map.jpeg";
import gsap from "gsap";
import IncomingRide from "@/components/IncomingRidePanel";
import CaptainNavBar from "@/components/CaptainNavBar";
import { transform } from "framer-motion";
import { sendMessage, updateLocation } from "@/features/socketSlice";
import { addRideRequest, fetchAllRides } from "@/features/rideRequestsListSlice";
import LiveTracking from "@/components/LiveTracking";

const CaptainAccount = () => {

  const {socket , connected} = useSelector((state) => state.socket);
  const paymentMethod = useSelector((state) => state.payment.paymentMethod);
  const {rideRequestsList} = useSelector((state) => state.rideRequestsList);
  const {captain} = useSelector((state)=> state.captain)
  console.log("All Ride Requests List: ", rideRequestsList)
    
  const currentUser = captain;

  const dispatch = useDispatch()

  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef(null);

  useEffect(() => {
    if (connected && socket) {
      console.log("Captain's socket ID:", socket.id); 
    }
  }, [connected, socket]);

  useEffect(() => {
    if (socket && connected) {
      dispatch(fetchAllRides())
      const handleNewRide = (data) => {
        console.log("New ride request: ", data);
        dispatch(addRideRequest(data));
      };

      socket.on("new-ride", handleNewRide);

      return () => {
        socket.off("new-ride", handleNewRide);
      };
    }
  }, [socket , connected , dispatch]);

  
  useEffect(()=>{
    
    if (socket && connected && currentUser?.captain?.role && currentUser?.captain?._id) {
      dispatch(sendMessage("join", {
          userType: currentUser.captain.role,
          userId: currentUser.captain._id,
      }));
  }

    if(socket && connected){
      dispatch(updateLocation())
    }
    // const locationInterval = setInterval(() => {
    //   dispatch(updateLocation())
    // } , 10000)

    // return () => clearInterval(locationInterval)

  }, [socket, connected, currentUser, dispatch])

  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, {
        x: 0, 
        duration: 0.3,
        ease: "power2.out", 
      });
    } else {
      gsap.to(menuRef.current, {
        x: "-100%",
        duration: 0.3,
        ease: "power2.out",
      });
    }

  }, [menuOpen]);

  return (
    <div className="h-screen">

      <div className="fixed top-4 left-4 z-[1000] bg-transparent p-3 rounded-full cursor-pointer">
        <div onClick={()=>{
          setMenuOpen(true)
        }} className="bg-transparent p-3 rounded-full w-max cursor-pointer">
          <Menu />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full">
        <LiveTracking />
      </div>

      <div
        className={`fixed bottom-0 z-10 w-full bg-white rounded-t-3xl`}
      >
        <CaptainDetail rideRequestsList={rideRequestsList} paymentMethod={paymentMethod} />
      </div>

      <div
        ref={menuRef}
        className={`fixed top-0 left-0 z-30 w-[80%] bg-white h-full translate-x-full`}
      >
        <CaptainNavBar setMenuOpen={setMenuOpen} />
      </div>

    </div>
  );
};

export default CaptainAccount;
