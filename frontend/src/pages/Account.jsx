import React, { useEffect, useRef, useState } from 'react'
import '../App.css'
import logo from "../assets/logo/logo.jpeg"
import { useDispatch, useSelector } from 'react-redux'
import { setDestination, setPickup , setServerResponse } from '../features/userLocationSlice'
import { useGSAP} from "@gsap/react"
import gsap from 'gsap'

const Account = () => {

  const dispatch = useDispatch()
  const { pickup , destination } = useSelector((state) => state.userLocation)
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    console.log("panelOpen changed:", panelOpen);
    
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });
    }
  }, [panelOpen]);

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('submitted')
  }

  return (
    <div className='h-screen relative'>
      <div className='px-10 py-5 h-72 w-62 absolute -left-12 -top-28 overflow-hidden'>
        <img src={logo} alt="logo" className='h-full w-full drop-shadow-lg logo-img z-50' />
      </div>
      <div className='h-[80%] w-screen'>
        <img className='h-full w-full object-cover' src="https://i2-prod.mylondon.news//article16106961.ece/ALTERNATES/s1200b/2_Uber-pink-cars.jpg" alt="map-image" />
      </div>
      <div className='h-screen absolute top-0 w-full flex flex-col justify-end'>
        <div className='h-[30%] bg-white p-5 relative'>
          <h4 className='text-2xl font-bold'>Find A Trip</h4>
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
            <div className='flex flex-col space-y-3 mt-4'>
              <div className='h-16 absolute w-1 top-[42%] left-10 bg-gray-700 rounded-full z-50'></div>
              <input value={pickup} 
              onMouseDown={() => console.log("Pickup input mouse down")}
              onTouchStart={() => console.log("Pickup input touch start")}
              onFocus={() => setPanelOpen(true)}
              onChange={(e)=>{
                dispatch(setPickup(e.target.value))
              }} className='bg-[#eee] rounded-md py-4 px-14 z-10' type="text" placeholder='Add a pickup location' />
              <input value={destination} onFocus={() => setPanelOpen(true)} onChange={(e)=>{
                dispatch(setDestination(e.target.value))
              }} className='bg-[#eee] rounded-md py-4 px-14 z-10' type="text" placeholder='Enter your destination' />
            </div>
          </form>
        </div>
        <div ref={panelRef} className='overflow-hidden bg-red-500'>
            
        </div>
      </div>
    </div>
  )
}

export default Account
