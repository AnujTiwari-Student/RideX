import { Gauge, Notebook, Timer } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import IncomingRidePanel from "./IncomingRidePanel";
import gsap from "gsap";

const CaptainDetail = ({rideRequestsList , paymentMethod}) => {

    const navigate = useNavigate()

    const [incomingRidePanel, setIncomingRidePanel] = useState(false)

    const IncomingRidePanelRef = useRef(null)

    useEffect(()=>{
      if(incomingRidePanel){
        gsap.to(IncomingRidePanelRef.current, {
          transform: "translateY(0)",
        });
      }else{
        gsap.to(IncomingRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },[incomingRidePanel])

  return (
    <>
      <div className="flex items-center justify-center my-2 w-full">
        <div className="w-16 border-3 rounded-xl"></div>
      </div>
      <div className="px-4 pb-2 pt-2">
        <div className="flex justify-between items-center mb-2 w-full">
          <div className="flex items-center gap-4">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src="https://kochhar.com/wp-content/uploads/2021/07/Anuj_Kaila-NEW02-closeup-WEB-FORMAT-.png"
              alt="driver-img"
            />
            <div className="flex flex-col items-start">
              <h4 className="text-xl font-bold">Anuj Tiwari</h4>
              <p className="text-gray-400">Basic Level</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <h5 className="text-xl font-bold">$295.02</h5>
            <p className="text-gray-400">Earned</p>
          </div>
        </div>

        <div className="flex justify-around items-center bg-gray-200 py-3 mb-2 px-4 rounded-xl">
          <div className="flex flex-col items-center gap-1">
            <Timer size={30} color="#616162" />
            <h5 className="text-lg font-medium">10.2 hr</h5>
            <p className="text-base font-medium text-gray-700">Online</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Gauge size={30} color="#616162" />
            <h5 className="text-lg font-medium">30 KM</h5>
            <p className="text-base font-medium text-gray-700">Distance</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Notebook size={30} color="#616162" />
            <h5 className="text-lg font-medium">20</h5>
            <p className="text-base font-medium text-gray-700">Rides</p>
          </div>
        </div>
      </div>
      {rideRequestsList.length == 1 && (
        <div 
            onClick={()=>{
              setIncomingRidePanel(true)
            }} 
            className="px-4 md:px-8 w-full flex items-center justify-center">
          <button
            className="w-full bg-black text-white text-center font-semibold my-4 rounded-md py-3"
          >
            Incoming Request
          </button>
        </div>
      )}

      {rideRequestsList.length > 1 && (
        <div 
            onClick={()=>{
              navigate("/captain/ride-requests" , {state : {rideRequestsList}})
            }} 
            className="px-4 md:px-8 w-full flex items-center justify-center">
          <button
            className="w-full bg-black text-white text-center font-semibold my-4 rounded-md py-3"
          >
            See All Requests
          </button>
        </div>
      )}

      
      <div
        ref={IncomingRidePanelRef}
        className={`fixed bottom-0 z-10 w-full bg-white rounded-t-3xl translate-y-full`}
      >
        <IncomingRidePanel rideRequestsList={rideRequestsList} paymentMethod={paymentMethod} incomingRidePanel={incomingRidePanel}  setIncomingRidePanel={setIncomingRidePanel}/>
      </div>
    </>
  );
};

export default CaptainDetail;
