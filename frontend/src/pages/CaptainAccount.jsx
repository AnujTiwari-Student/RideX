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
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo/logo.jpeg";
import CaptainDetail from "@/components/CaptainDetail";
import mapImage from "../assets/image/Map.jpeg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import IncomingRide from "@/components/IncomingRidePanel";

const CaptainAccount = () => {
  
  const paymentMethod = useSelector((state) => state.payment.paymentMethod);
  const rideRequestsList = useSelector((state) => state.rideRequestsList.rideRequestsList);

  const CaptainDetainRef = useRef(null);

  const [captainDetail, setCaptainDetail] = useState(true);

  useEffect(() => {
    if (captainDetail) {
      gsap.to(CaptainDetainRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(CaptainDetainRef.current, {
        transform: "translateY(-100%)",
      });
    }
  }, [captainDetail]);

  return (
    <div className="h-screen">
      <div className="px-10 py-5 h-72 w-62 absolute -left-12 -top-28 overflow-hidden">
        <img
          src={logo}
          alt="logo"
          className="h-full w-full drop-shadow-lg logo-img z-50"
        />
      </div>
      <div className="h-full w-screen">
        <img
          className="h-full w-full object-cover"
          src={mapImage}
          alt="map-image"
        />
      </div>

      <div
        ref={CaptainDetainRef}
        className={`fixed bottom-0 z-10 w-full bg-white rounded-t-3xl translate-y-full`}
      >
        <CaptainDetail rideRequestsList={rideRequestsList} paymentMethod={paymentMethod} />
      </div>
    </div>
  );
};

export default CaptainAccount;
