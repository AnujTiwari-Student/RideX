import React, { useEffect, useRef, useState } from 'react'
import { CarFront, CircleX, MessageSquareMore, Phone } from 'lucide-react';
import gsap from 'gsap';
import MessagePanel from './MessagePanel';
import { useDispatch, useSelector } from 'react-redux';

const DriverFound = ({driverFound}) => {

    const dispatch = useDispatch()

    const { captainData , otp } = useSelector((state) => state.rideRequestsList)

    const [messagePanelOpen, setMessagePanelOpen] = useState(false);
    const [locationName, setLocationName] = useState(null)

    useEffect(()=>{
      if(captainData){
        const getLocationName = async (lat, lng) => {
          const apiKey = import.meta.env.VITE_Google_Maps_Api_Key; 
      
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
          );
          const data = await res.json();
          console.log("Location Data from Google: ", data)
      
          if (data.status === "OK" && data.results.length > 0) {
            setLocationName(data.results[0].formatted_address)
          } else {
            console.warn("Google Geocoding returned no results");
            setLocationName("Unknown Location")
          }
            } catch (error) {
              console.error("Reverse geocoding failed:", error);
              setLocationName("Unknown Location")
            }
        };
        getLocationName(captainData.location.lat, captainData.location.lng);
      }
    } , [captainData])    
  
    const messagePanelRef = useRef(null);    

    useEffect(() => {
      if(messagePanelOpen){
        gsap.to(messagePanelRef.current, {
          transform: 'translateY(0)'
        })
      }else{
        gsap.to(messagePanelRef.current, {
          transform: 'translateY(100%)'
        })
      }
      }, [messagePanelOpen])

  return (
    <div className=''> 
      <div onClick={()=>{
        driverFound(false)
      }} className='w-full flex justify-center mt-3 rounded-t-3xl'>
        <div className='h-2 bg-gray-300 rounded-full w-24'></div>
      </div>
      <div className='flex items-center justify-center my-4'>
        <h3 className='text-xl font-semibold'>Driver Details</h3>
      </div>
      <div className='h-[1px] w-full bg-gray-300'></div>
      <div className='w-full flex justify-between items-center px-6 mt-4'>
        <div className='flex relative w-max'>
          <div className='h-14 w-14 overflow-hidden z-10'>
            <img className='h-full object-cover w-full rounded-full' src="https://kochhar.com/wp-content/uploads/2021/07/Anuj_Kaila-NEW02-closeup-WEB-FORMAT-.png" alt="car.png" />
          </div>
          <div className='h-14 w-14 absolute left-14'>
            <img className='h-full rounded-full w-full' src="https://www.pngplay.com/wp-content/uploads/7/Black-Car-Transparent-Background.png" alt="car.png" />
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <h3 className='text-gray-600 font-bold text-large'>{captainData?.firstname} {captainData?.lastname}</h3>
          <h2 className='text-lg font-bold'>{captainData?.vehiclePlate}</h2>
          <h6 className='text-gray-500 font-semibold text-sm'>{captainData?.vehicleColor} Mercedes S-Presso LXI</h6>
          <h1 className='text-gray-600 font-bold mt-2'>OTP: {otp}</h1>
        </div>
      </div>
      <div className='flex justify-between items-center px-6 my-6'>
        <div onClick={()=>{
          // cancelRide(rideData)
        }} className='flex flex-col justify-center gap-2 items-center'>
          <div className='rounded-full h-16 w-16 bg-gray-200 flex items-center justify-center overflow-hidden'>
              <CircleX color='#2468c2' size={28} />
          </div>
          <h3 className='text-large font-semibold'>Cancel</h3>
        </div>
        <div onClick={()=>{
            setMessagePanelOpen(true)
          }}  className='flex flex-col gap-2 items-center'>
          <div className='rounded-full h-16 w-16 bg-gray-200 flex items-center justify-center overflow-hidden'>
              <MessageSquareMore color='#2468c2' size={24} />
          </div>
          <h3 className='text-large font-semibold'>Message</h3>
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <div className='rounded-full h-16 w-16 bg-gray-200 flex items-center justify-center overflow-hidden'>
              <Phone color='#2468c2' size={24} />
          </div>
          <h3 className='text-large font-semibold'>Call</h3>
        </div>
      </div>
      <div className='h-[1px] w-full bg-gray-300 mb-3'></div>
      <div className='w-full flex flex-col px-5 pb-2'>
        <div className='flex gap-5 items-center mb-2'>
            <div className='rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0'>
                <CarFront color='black' size={32} />
            </div>
            <h4 className='text-large font-medium'>
                  {locationName || 'Fetching location...'}
            </h4>
        </div>
      </div>
      <div
        ref={messagePanelRef}
        className={`fixed -bottom-1 h-screen w-full z-[2000] bg-white rounded-t-3xl translate-y-full`}
      >
        <MessagePanel setMessagePanelOpen={setMessagePanelOpen} />
      </div>
    </div>
  )
}

export default DriverFound
