import React, { useEffect, useRef, useState } from 'react'
import '../App.css'
import mapImage from '../assets/image/Map.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import { setDestination, setPickup } from '../features/userLocationSlice'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom'
import LocationPanel from '../components/LocationPanel'
import VehiclePanel from '../components/VehiclePanel'
import SelectedVehiclePanel from '../components/SelectedVehiclePanel'
import LookingForDriver from '../components/LookingForDriver'
import DriverFound from '../components/DriverFound'
import { Flag, Menu } from 'lucide-react'
import UserNavBar from '@/components/UserNavBar'

const Account = () => {
  const dispatch = useDispatch()
  const { pickup, destination } = useSelector((state) => state.userLocation)
  const navigate = useNavigate();
  
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [selectedVehiclePanel, setSelectedVehiclePanel] = useState(false)
  const [lookingForDriver, setLookingForDriver] = useState(false)
  const [driverFound, setDriverFound] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  const panelCloseRef = useRef(null)
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const selectedVehicleRef = useRef(null)
  const lookingForDriverRef = useRef(null)
  const driverFoundRef = useRef(null)
  const menuRef = useRef(null)

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

  useEffect(() => {
    const animations = [
      {
        ref: panelRef,
        state: panelOpen,
        animation: { height: "70%", paddingLeft: 24, paddingRight: 24 },
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
    <div className='h-screen relative'>
      <div style={{backgroundImage: `url(${mapImage})`}} className="h-full w-screen bg-cover bg-center py-2 px-4">
        <div onClick={()=>{
          setMenuOpen(true)
        }} className="bg-transparent p-3 rounded-full w-max cursor-pointer z-[1050] relative">
          {panelOpen ? null : <Menu />}
        </div>
      </div>
      <div className='h-screen fixed bottom-0 w-full flex flex-col justify-end'>
        <div className={`${panelOpen ? "h-[30%]" : "h-[35%]"} bg-white p-5 relative ${!panelOpen ? "rounded-t-3xl" : ""}`}>
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
        </div>
        <div ref={panelRef} className='overflow-hidden bg-white'>
          <LocationPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className={`fixed bottom-0 z-10 w-full p-3 bg-white rounded-t-3xl translate-y-full`}>
        <VehiclePanel selectedVehiclePanel={setSelectedVehiclePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={selectedVehicleRef} className={`fixed bottom-0 z-10 w-full bg-white rounded-t-4xl shadow-2xl translate-y-full`}>
        <SelectedVehiclePanel selectedVehiclePanel={setSelectedVehiclePanel} lookingForDriver={setLookingForDriver} />
      </div>
      <div ref={lookingForDriverRef} className={`fixed bottom-0 z-10 w-full bg-white rounded-t-3xl translate-y-full`}>
        <LookingForDriver />
      </div>
      <div ref={driverFoundRef} className={`fixed bottom-0 z-10 w-full bg-white rounded-t-3xl translate-y-full`}>
        <DriverFound driverFound={setDriverFound} />
      </div>
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-[80%] z-[2000] bg-white h-full translate-x-full`}
      >
        <UserNavBar setMenuOpen={setMenuOpen} />
      </div>
    </div>
  )
}

export default Account
