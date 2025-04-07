import React, { useEffect, useRef, useState } from 'react'
import { MessageSquareMore, SendHorizontal } from 'lucide-react';
import { Phone , Map , Shield , Star } from 'lucide-react';
import gsap from 'gsap';
import MessagePanel from './MessagePanel';
import { useDispatch, useSelector } from 'react-redux';

const DriverFound = ({driverFound}) => {

    const dispatch = useDispatch()

    const {captainData} = useSelector((state) => state.rideRequestsList)

    const [messagePanelOpen, setMessagePanelOpen] = useState(false);
  
    const messagePanelRef = useRef(null);

    async function getPlaceFromLatLng(lat, lng) {
      const apiKey = import.meta.env.Google_Maps_Api_Key; 
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    
      try {
        const response = await fetch(url);
        const data = await response.json();
    
        if (data.status === 'OK') {
          const address = data.results[0].formatted_address;
          console.log('Address:', address);
          return address;
        } else {
          console.error('Geocoding failed:', data.status);
          return null;
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        return null;
      }
    }
    

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
          <div className='h-16 w-16 overflow-hidden z-10'>
          <img className='h-full w-full rounded-full' src="https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png" alt="car.png" />
          </div>
          <div className='h-16 w-16 absolute left-14'>
          <img className='h-full rounded-full w-full' src="https://www.pngplay.com/wp-content/uploads/7/Black-Car-Transparent-Background.png" alt="car.png" />
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <h3 className='text-gray-600 font-bold text-large'>{captainData?.firstname} {captainData?.lastname}</h3>
          <h2 className='text-lg font-bold'>{captainData?.vehiclePlate}</h2>
          <h6 className='text-gray-500 font-semibold text-sm'>{captainData?.vehicleColor} Mercedes S-Presso LXI</h6>
          <p className='text-gray-600 font-bold text-base flex gap-2 mt-1'><Star fill='black' size={20} /> 4.9</p>
        </div>
      </div>
      <div className='flex justify-around items-center px-4 my-6'>
        <div className='flex flex-col justify-center gap-2 items-center'>
          <div className='rounded-full h-16 w-16 bg-gray-200 flex items-center justify-center overflow-hidden'>
              <Shield color='#2468c2' fill='#2468c2' size={24} />
          </div>
          <h3 className='text-large font-semibold'>Safety</h3>
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
              <Phone color='#2468c2' fill='#2468c2' size={24} />
          </div>
          <h3 className='text-large font-semibold'>Call</h3>
        </div>
      </div>
      <div className='h-[1px] w-full bg-gray-300 mb-3'></div>
      <div className='w-full flex flex-col px-5 pb-2'>
        <div className='flex gap-3 items-center mb-2'>
            <div className='rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0'>
                <h5 className='text-black'><i className="ri-map-pin-2-fill text-xl"></i></h5>
            </div>
            <h4 className='text-large font-medium'>
                {/* {getPlaceFromLatLng(captainData?.location?.lat , captainData?.location?.lng)} */}
            </h4>
        </div>
      </div>
      <div
        ref={messagePanelRef}
        className={`fixed -bottom-1 z-10 h-screen w-full bg-white rounded-t-3xl translate-y-full`}
      >
        <MessagePanel setMessagePanelOpen={setMessagePanelOpen} />
      </div>
    </div>
  )
}

export default DriverFound
