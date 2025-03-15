import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LocateFixed } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import CaptainRideDetailPanel from "./CaptainRideDetailPanel";
import gsap from "gsap";

const IncomingRidePanel = ({rideRequestsList=[] , paymentMethod , setIncomingRidePanel}) => {

    const [currentIndex, setCurrentIndex] = useState(0)

    const [rideDetailsPanel, setRideDetailsPanel] = useState(false)

    useEffect(()=>{
      if(rideDetailsPanel){
          gsap.to(rideDetailsPanelRef.current, {
              transform: 'translateY(0)'
          })
      }else{
          gsap.to(rideDetailsPanelRef.current, {
              transform: 'translateY(100%)'
          })
      }
  },[rideDetailsPanel])

  const rideDetailsPanelRef = useRef(null)

    const handleIgnore = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

  return (
    <>
      <div className="w-full">
        <div className="bg-white rounded-t-3xl pt-3 pb-3 px-4">
        <div onClick={()=>{
          setIncomingRidePanel(false)
        }} className='w-full flex justify-center mb-4 rounded-t-3xl'>
          <div className='h-2 bg-gray-300 rounded-full w-24'></div>
        </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center py-2 gap-6">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src="https://kochhar.com/wp-content/uploads/2021/07/Anuj_Kaila-NEW02-closeup-WEB-FORMAT-.png"
                alt="user-img"
              />
              <div className="flex flex-col items-start gap-1">
                <h3 className="text-lg font-bold">Anuj Tiwari</h3>
                <div className='bg-yellow-400 flex items-center justify-center px-8 rounded-xl'>
                    <p className='font-bold text-sm'>Cash</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <h3 className="text-lg font-bold">$25.00</h3>
              <p className="text-sm">2.2 km</p>
            </div>
          </div>

          <div className="border-[1px] border-gray-100 w-full mb-2 mt-4"></div>

          <div className="w-full flex flex-col">
            <div className="flex gap-3 items-center">
              <div className="rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                <h5 className="text-black">
                  <i className="ri-map-pin-2-fill text-xl"></i>
                </h5>
              </div>
              <h4 className="text-base font-medium">
                24B, Near Kapoors Cafe , New Delhi, Uttar Pradesh, India
              </h4>
            </div>
          </div>

          <div className="border-[1px] border-gray-100 w-full mb-2 mt-4"></div>

          <div className="flex gap-3 items-center">
            <div className="rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
              <h5 className="text-black">
                <i className="ri-square-fill text-xl"></i>
              </h5>
            </div>  
            <h4 className="text-base font-medium">
              24B, Near Kapoors Cafe , New Delhi, Uttar Pradesh, India
            </h4>
          </div>

          <div className="border-[1px] border-gray-100 w-full mb-2 mt-4"></div>

          <div className={`w-full items-center flex ${rideRequestsList.length > 1 ? 'justify-between' : 'justify-end'} gap-5 `}>
            {rideRequestsList.length > 1 && (<Link className="flex font-medium text-sm underline underline-offset-2" to='/captain/ride-requests'>See All</Link>)}
            <div className="items-center flex justify-end gap-5">
                <button onClick={()=>{
                  if(rideRequestsList.length > 1){
                    handleIgnore()
                  }else{
                    setIncomingRidePanel(false)
                  }
                }} className="font-bold text-gray-500 text-lg">Ignore</button>
                <button onClick={()=>{
                  setRideDetailsPanel(true)
                }} className="bg-black text-white px-8 py-3 rounded-xl">
                Accept
                </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={rideDetailsPanelRef} className={`fixed bottom-0 z-10 h-screen w-full bg-white rounded-t-3xl translate-y-full`}>
        <CaptainRideDetailPanel rideRequestsList={rideRequestsList} paymentMethod={paymentMethod} />
      </div>
    </>
  );
};

export default IncomingRidePanel;
