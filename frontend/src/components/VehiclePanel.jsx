import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedVehicle, setSelectedVehicleFare } from '@/features/selectedVehicleSlice'
import { Loader } from 'lucide-react'

const VehiclePanel = ({setVehiclePanel , selectedVehiclePanel , fare , loading}) => {

    const dispatch = useDispatch()

    const [selected, setSelected] = useState(false)

    const handleSelectVehicle = (vehicleType)=>{
      dispatch(setSelectedVehicle(vehicleType))
      dispatch(setSelectedVehicleFare(fare[vehicleType]))
      setSelected(vehicleType);
      selectedVehiclePanel(true)
      setVehiclePanel(false)
    }

  return (
    <>
      <div className='flex items-center justify-between w-full mb-4 mt-2'>
          <div className='rounded-3xl bg-gray-200 py-3 px-5'>
            <h5 className=''><i className="ri-timer-line"></i> Leave Now <i className="ri-arrow-down-s-line"></i></h5>
          </div>
            <h5 onClick={()=>{
              setVehiclePanel(false)
            }} className='text-xl'><i className="ri-arrow-down-wide-line"></i></h5>
        </div>
        <div className={`flex w-full rounded-xl items-center gap-4 py-3 cursor-pointer ${
          selected === "car" ? "border-2 border-black" : "border-2 border-gray-100"
        }`}
        onClick={()=> {
          handleSelectVehicle("car")
        }}>
          <div className='h-20 w-28 flex-shrink-0'>
            <img className='h-full w-full' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png" alt="car-png" />
          </div>
          <div className='flex items-start justify-between w-full'>
            <div className='flex flex-col justify-center'>
              <h4 className='text-lg font-semibold'>Premier <span><i className="ri-user-3-fill text-base"></i> 4</span></h4>
              <h3>2 min away ● 15:24</h3>
              <h5 className='text-xs text-gray-500'>Affordable , premier rides</h5>
            </div>
            <h5 className='text-lg font-semibold pr-5'>₹{fare?.car ? fare.car : <Loader />}</h5>
          </div>
        </div>
        <div className={`flex w-full rounded-xl items-center gap-4 py-3 cursor-pointer ${
          selected === "auto" ? "border-2 border-black" : "border-2 border-gray-100"
        }`}
        onClick={()=>{
          handleSelectVehicle("auto")
        }}>
          <div className='h-16 w-28 flex-shrink-0'>
            <img className='h-full w-full' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="car-png" />
          </div>
          <div className='flex items-start justify-between w-full'>
            <div className='flex flex-col justify-center'>
              <h4 className='text-lg font-semibold'>UberGo <span><i className="ri-user-3-fill text-base"></i> 3</span></h4>
              <h3>2 min away ● 15:24</h3>
              <h5 className='text-xs text-gray-500'>Affordable , compact rides</h5>
            </div>
            <h5 className='text-lg font-semibold pr-5'>₹{fare?.auto ? fare.auto : <Loader />}</h5>
          </div>
        </div>
        <div className={`flex w-full rounded-xl items-center gap-4 py-3 cursor-pointer ${
          selected === "motorcycle" ? "border-2 border-black" : "border-2 border-gray-100"
        }`}
        onClick={() => {
          handleSelectVehicle("motorcycle")
        }}>
          <div className='h-16 w-28 flex-shrink-0'>
            <img className='h-full w-full' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="car-png" />
          </div>
          <div className='flex items-start justify-between w-full'>
            <div className='flex flex-col justify-center'>
              <h4 className='text-lg font-semibold'>Moto <span><i className="ri-user-3-fill text-base"></i> 1</span></h4>
              <h3>2 min away ● 15:24</h3>
              <h5 className='text-xs text-gray-500'>Affordable , motorcycle rides</h5>
            </div>
            <h5 className='text-lg font-semibold pr-5'>₹{fare?.motorcycle ? fare.motorcycle : <Loader />}</h5>
          </div>
        </div>
    </>
  )
}

export default VehiclePanel
