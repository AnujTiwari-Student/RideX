import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import '../App.css'
import mapImage from '../assets/image/Map.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import { locationSuggestion, setDestination, setPickup } from '../features/userLocationSlice'
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
import axios from 'axios'
import { sendMessage } from '@/features/socketSlice'
import { setRideRequest } from '@/features/rideRequestSlice'
import { cancelRide, setCaptainData, setOtp } from '@/features/rideRequestsListSlice'
import toast from 'react-hot-toast'

const Account = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [selectedVehiclePanel, setSelectedVehiclePanel] = useState(false)
  const [lookingForDriver, setLookingForDriver] = useState(false)
  const [driverFound, setDriverFound] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [focusField, setFocusField] = useState(null)
  const [rideData , setRideData] = useState(null)
  
  const { rideFare , loading , captainData } = useSelector((state) => state.rideRequestsList)
  const {user} = useSelector((state)=> state.user)
  const {socket , connected} = useSelector((state) => state.socket);

   const currentUser = user ;

  const [userLocation, setUserLocation] = useState({
    pickup: "",
    destination: "",
    locationSuggestion: "",
  })

  useEffect(()=>{
    console.log("Captain Data: ", captainData)
  }, [captainData])

  const handleChange = (e) => {
    setUserLocation({
      ...userLocation,
      [e.target.name]: e.target.value
    })
    dispatch(locationSuggestion( e.target.value ));
  }

    console.log("User Socket ID: ", user?.socketId)
    console.log("Socket ID Connected: ", socket?.id)

  const panelCloseRef = useRef(null)
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const selectedVehicleRef = useRef(null)
  const lookingForDriverRef = useRef(null)
  const driverFoundRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(()=>{

    if (!socket || !connected || !currentUser?.user?._id) {
      console.log("Socket not connected yet.");
      return;
    }

    dispatch(sendMessage("join" , {userType: currentUser?.user?.role, userId: currentUser?.user?._id}))
    
    const handleRideConfirmed = (data) => {
      console.log("Ride confirmed: ", data);
      setRideData(data)
      toast.success("Ride confirmed successfully")
      dispatch(setOtp(data.otp))
      dispatch(setCaptainData(data.captain))
      setLookingForDriver(false);
      setDriverFound(true);
    };

    const handleCancelRide = (data) => {
      console.log("Ride cancelled: ", data);
      setLookingForDriver(false);
      setDriverFound(false);
      setVehiclePanel(false);
      toast.error("Ride cancelled by Captain")
      setUserLocation({
        pickup: "",
        destination: "",
      })
      dispatch(setCaptainData(null))
      dispatch(setOtp(null))
    }
  
    socket.on("ride-confirmed", handleRideConfirmed);
    socket.on("ride-cancelled", handleCancelRide);
    console.log("Listening for ride-confirmed event...");
  
    return () => {
      socket.off("ride-confirmed", handleRideConfirmed);
      console.log("Removed ride-confirmed listener");
    };
  }, [dispatch, currentUser , socket, connected])

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
        animation: { transform: "translateY(0)" },
        reverse: { transform: "translateY(100%)" },
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

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setPickup(userLocation.pickup))
    dispatch(setDestination(userLocation.destination))
  }

  return (
    <div className='h-screen relative'>
      <div style={{backgroundImage: `url(${mapImage})`}} className="h-full w-screen bg-cover bg-center py-2 px-4">
        <div onClick={()=>{
          setMenuOpen(true)
        }} className="bg-transparent p-3 rounded-full w-max cursor-pointer z-[10] relative">
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
          <form onSubmit={handleSubmit}>
            <div className="relative flex flex-col space-y-3 my-4">
              {/* Vertical Line */}
              <div className="absolute h-[65px] left-6 top-0 bottom-0 w-1 bg-gray-700 rounded-full z-5 my-auto"></div>

              {/* Pickup Input */}
              <input
                name="pickup"
                value={userLocation.pickup}
                onFocus={() => {
                  setPanelOpen(true);
                  setFocusField("pickup")
                }}
                onChange={handleChange}
                className="bg-[#eee] rounded-md py-4 px-14 outline-none"
                type="text"
                placeholder="Add a pickup location"
              />

              {/* Destination Input */}
              <input
                name="destination"
                value={userLocation.destination}
                onFocus={() => {
                  setPanelOpen(true);
                  setFocusField("destination");
                  
                }}
                onChange={handleChange}
                className="bg-[#eee] rounded-md py-4 px-14 outline-none"
                type="text"
                placeholder="Enter your destination"
              />
            </div>
          </form>
        </div>
        <div ref={panelRef} className='bg-white'>
          <LocationPanel setPanelOpen={setPanelOpen} panelOpen={panelOpen} setVehiclePanel={setVehiclePanel} setUserLocation={setUserLocation} focusField={focusField} handleSubmit={handleSubmit} userLocation={userLocation} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className={`fixed bottom-0 z-10 w-full p-3 bg-white rounded-t-3xl translate-y-full`}>
        <VehiclePanel loading={loading} fare={rideFare} selectedVehiclePanel={setSelectedVehiclePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={selectedVehicleRef} className={`fixed bottom-0 z-10 w-full bg-white rounded-t-4xl shadow-2xl translate-y-full`}>
        <SelectedVehiclePanel selectedVehiclePanel={setSelectedVehiclePanel} lookingForDriver={setLookingForDriver} />
      </div>
      <div ref={lookingForDriverRef} className={`fixed bottom-0 z-10 w-full bg-white rounded-t-3xl translate-y-full`}>
        <LookingForDriver />
      </div>
      <div ref={driverFoundRef} className={`fixed bottom-0 z-10 w-full bg-white rounded-t-3xl translate-y-full`}>
        <DriverFound driverFound={setDriverFound}  />
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
