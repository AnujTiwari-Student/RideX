import React, { useEffect, useRef, useState } from 'react'
import '../App.css'
import logo from "../assets/logo/logo.jpeg"
import { useDispatch, useSelector } from 'react-redux'
import { setDestination, setPickup } from '../features/userLocationSlice'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom'
import LocationPanel from '../components/LocationPanel'
import VehiclePanel from '../components/VehiclePanel'
import SelectedVehiclePanel from '../components/SelectedVehiclePanel'
import LookingForDriver from '../components/LookingForDriver'
import DriverFound from '../components/DriverFound'

const Account = () => {
  const dispatch = useDispatch()
  const { pickup, destination } = useSelector((state) => state.userLocation)
  const navigate = useNavigate();
  
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [selectedVehiclePanel, setSelectedVehiclePanel] = useState(false)
  const [lookingForDriver, setLookingForDriver] = useState(false)
  const [driverFound, setDriverFound] = useState(true)

  const panelCloseRef = useRef(null)
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const selectedVehicleRef = useRef(null)
  const lookingForDriverRef = useRef(null)
  const driverFoundRef = useRef(null)

  useEffect(() => {
    const animations = [
      {
        ref: panelRef,
        state: panelOpen,
        animation: { height: "68%", paddingLeft: 24, paddingRight: 24 },
        reverse: { height: "0%", paddingLeft: 0, paddingRight: 0 },
      },
      {
        ref: panelCloseRef,
        state: panelOpen,
        animation: { opacity: 1 },
        reverse: { opacity: 0 },
      },
      {
        ref: vehiclePanelRef,
        state: vehiclePanel,
        animation: { transform: "translateY(0)" },
        reverse: { transform: "translateY(100%)" },
      },
      {
        ref: driverFoundRef,
        state: driverFound,
        animation: { transform: "translateY(100%)" },
        reverse: { transform: "translateY(0)" },
      },
      {
        ref: lookingForDriverRef,
        state: lookingForDriver,
        animation: { transform: "translateY(0)" },
        reverse: { transform: "translateY(100%)" },
      },
      {
        ref: selectedVehicleRef,
        state: selectedVehiclePanel,
        animation: { transform: "translateY(0)" },
        reverse: { transform: "translateY(100%)" },
      },
    ];

    animations.forEach(({ ref, state, animation, reverse }) => {
      if (ref.current) {
        gsap.to(ref.current, state ? animation : reverse);
      }
    });
  }, [panelOpen, vehiclePanel, driverFound, lookingForDriver, selectedVehiclePanel]);

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('submitted')
  }

  return (
    <div className='h-screen relative overflow-hidden'>
      <div className='px-10 py-5 h-72 w-62 absolute -left-12 -top-28 overflow-hidden'>
        <img src={logo} alt="logo" className='h-full w-full drop-shadow-lg logo-img z-50' />
      </div>
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://i2-prod.mylondon.news//article16106961.ece/ALTERNATES/s1200b/2_Uber-pink-cars.jpg" alt="map-image" />
      </div>
      <div className='h-screen absolute top-0 w-full flex flex-col justify-end'>
        <div className={`${panelOpen ? "h-[32%]" : "h-[35%]"} bg-white p-5 relative ${!panelOpen ? "rounded-t-3xl" : ""}`}>
          <div className='flex justify-between items-center'>
            <h4 className='text-xl font-semibold'>{panelOpen ? "Plan A Trip" : "Find A Trip"}</h4>
            {panelOpen ? <div className='rounded-3xl bg-gray-200 py-3 px-5 w-max'>
              <h5><i className="ri-timer-line"></i> Leave Now <i className="ri-arrow-down-s-line"></i></h5>
          </div> : null}
            <h5 ref={panelCloseRef} className='text-xl cursor-pointer' onClick={() => setPanelOpen(!panelOpen)}>
              <i className={`ri-arrow-${panelOpen ? "down" : "up"}-wide-line`}></i>
            </h5>
          </div>
          <form onSubmit={submitHandler}>
            <div className="relative flex flex-col space-y-3 my-4">
              {/* Vertical Line */}
              <div className="absolute h-[65px] left-6 top-0 bottom-0 w-1 bg-gray-700 rounded-full z-5 my-auto"></div>

              {/* Pickup Input */}
              <input
                value={pickup}
                onFocus={() => setPanelOpen(true)}
                onChange={(e) => dispatch(setPickup(e.target.value))}
                className="bg-[#eee] rounded-md py-4 px-14 outline-none"
                type="text"
                placeholder="Add a pickup location"
              />

              {/* Destination Input */}
              <input
                value={destination}
                onFocus={() => setPanelOpen(true)}
                onChange={(e) => dispatch(setDestination(e.target.value))}
                className="bg-[#eee] rounded-md py-4 px-14 outline-none"
                type="text"
                placeholder="Enter your destination"
              />
            </div>
          </form>
          {panelOpen ? null : <div className='rounded-3xl bg-gray-200 py-3 px-5 w-max'>
              <h5><i className="ri-timer-line"></i> Leave Now <i className="ri-arrow-down-s-line"></i></h5>
          </div>}
        </div>
        <div ref={panelRef} className='overflow-hidden bg-white'>
          <LocationPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className={`fixed bottom-0 z-10 w-full p-3 bg-white rounded-t-3xl translate-y-full`}>
        <VehiclePanel selectedVehiclePanel={setSelectedVehiclePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={selectedVehicleRef} className={`fixed bottom-0 z-10 w-full bg-white rounded-t-3xl translate-y-full`}>
        <SelectedVehiclePanel selectedVehiclePanel={setSelectedVehiclePanel} lookingForDriver={setLookingForDriver} />
      </div>
      <div ref={lookingForDriverRef} className={`fixed bottom-0 z-10 w-full bg-white rounded-t-3xl translate-y-full`}>
        <LookingForDriver />
      </div>
      <div ref={driverFoundRef} className={`fixed bottom-0 z-10 w-full bg-white rounded-t-3xl translate-y-full`}>
        <DriverFound driverFound={setDriverFound} />
      </div>
    </div>
  )
}

export default Account
