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
import { useSelector } from "react-redux";
import logo from "../assets/logo/logo.jpeg";
import CaptainDetail from "@/components/CaptainDetail";
import mapImage from "../assets/image/Map.jpeg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import IncomingRide from "@/components/IncomingRidePanel";
import CaptainNavBar from "@/components/CaptainNavBar";
import { transform } from "framer-motion";

const CaptainAccount = () => {
  
  const paymentMethod = useSelector((state) => state.payment.paymentMethod);
  const rideRequestsList = useSelector((state) => state.rideRequestsList.rideRequestsList);

  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef(null);

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

      <div style={{backgroundImage: `url(${mapImage})`}} className="h-full w-screen bg-cover bg-center py-2 px-4">
        <div onClick={()=>{
          setMenuOpen(true)
        }} className="bg-transparent p-3 rounded-full w-max cursor-pointer">
          <Menu />
        </div>
      </div>

      <div
        className={`fixed bottom-0 z-10 w-full bg-white rounded-t-3xl`}
      >
        <CaptainDetail rideRequestsList={rideRequestsList} paymentMethod={paymentMethod} />
      </div>

      <div
        ref={menuRef}
        className={`fixed top-0 left-0 z-10 w-[80%] bg-white h-full translate-x-full`}
      >
        <CaptainNavBar setMenuOpen={setMenuOpen} />
      </div>

    </div>
  );
};

export default CaptainAccount;
