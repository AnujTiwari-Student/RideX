import { createRide } from '@/features/rideRequestsListSlice'
import { ChevronRight, LoaderCircle } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SelectedVehiclePanel = ({ selectedVehiclePanel , lookingForDriver }) => {

  const dispatch = useDispatch();

  const {selectedVehicleFare} = useSelector((state) => state.selectedVehicle);
  // console.log(selectedVehicleFare);
  const vehicleType = useSelector((state) => state.selectedVehicle.selectedVehicle);
  const {pickup , destination} = useSelector((state) => state.userLocation);

  const handleClick = () => {
    selectedVehiclePanel(false);
    lookingForDriver(true);
    dispatch(createRide({ pickup , destination , vehicleType }))
  }

  return (
    <div>
      <div onClick={()=>{
        selectedVehiclePanel(false)
      }} className='w-full flex justify-center mt-3 mb-4 rounded-t-3xl'>
        <div className='h-2 bg-gray-300 rounded-full w-24'></div>
      </div>
      <h3 className='w-full text-center text-2xl text-gray-700 font-bold tracking-tight mb-2'>Confirm Your Ride</h3>
      <div className='h-32 w-full flex items-center justify-center mb-4'>
        <img className='h-full w-44' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png" alt="" />
      </div>
      <div className='h-[1px] w-full bg-gray-500 mb-3'></div>
      <div className='w-full flex flex-col p-5'>
        <div className='flex gap-3 items-center mb-2'>
            <div className='rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0'>
                <h5 className='text-black'><i className="ri-map-pin-2-fill text-xl"></i></h5>
            </div>
            <h4 className='text-lg font-semibold'>
                {pickup}
            </h4>
        </div>
        <div className='flex gap-3 items-center mb-3'>
            <div className='rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0'>
                <h5 className='text-black'><i className="ri-square-fill text-xl"></i></h5>
            </div>
            <h4 className='text-lg font-semibold'>
                {destination}
            </h4>
        </div>
        <div className='flex gap-3 items-center mb-5'>
            <div className='rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0'>
                <h5 className='text-black'><i className="ri-bank-card-2-fill text-xl"></i></h5>
            </div>
            <div className='flex justify-between items-end w-full'>
                <div className='flex flex-col'>
                  <h4 className='text-lg font-semibold tracking-wide'>
                    ₹ {Math.round(selectedVehicleFare)}
                  </h4>
                  <p className='font-medium text-gray-600'>
                      Cash Cash
                  </p>
                </div>
                {/* <Link to='/user/payment-method'>
                  <ChevronRight />
                </Link> */}
                <h6 className='text-xs text-gray-800'>Can be change later</h6>
            </div>
        </div>
        <button onClick={()=>{
          handleClick()
        }} className='text-lg font-semibold bg-black text-white rounded-md py-2 w-full'>
            Confirm Ride
        </button>
      </div>
      
    </div>
  )
}

export default SelectedVehiclePanel
