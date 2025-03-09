import React, { useEffect, useState } from 'react'
import { SendHorizontal } from 'lucide-react';
import { Phone , Map , Shield , Star } from 'lucide-react';

const DriverFound = ({driverFound}) => {

  const [message, setMessage] = useState(" ")

  return (
    <div className=''> 
      <div onClick={()=>{
        driverFound(false)
      }} className='w-full flex justify-center mt-3 rounded-t-3xl'>
        <div className='h-2 bg-gray-300 rounded-full w-24'></div>
      </div>
      <div className='w-full flex justify-between items-center px-6 mt-6 mb-4'>
        <div className='flex relative w-max'>
          <div className='h-20 w-20 overflow-hidden z-10'>
          <img className='h-full w-full rounded-full' src="https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png" alt="car.png" />
          </div>
          <div className='h-20 w-20 absolute left-14'>
          <img className='h-full rounded-full w-full' src="https://www.pngplay.com/wp-content/uploads/7/Black-Car-Transparent-Background.png" alt="car.png" />
          </div>
        </div>
        <div className='flex flex-col items-end gap-[1px]'>
          <h3 className='text-gray-600 font-bold text-large'>Anuj</h3>
          <h2 className='text-xl font-bold'>KA15AK00-0</h2>
          <h6 className='text-gray-500 font-semibold text-sm'>Gray Mercedes S-Presso LXI</h6>
          <p className='text-gray-600 font-bold text-base flex gap-2 mt-1'><Star fill='black' size={20} /> 4.9</p>
        </div>
      </div>
      <div className="relative px-4 w-full mb-6">
        <div className="relative flex items-center bg-gray-200 rounded-xl w-full px-4 py-3">
          <input type="text" placeholder='Send Message....' className='px-4 py-2 outline-none w-[90%]' onChange={(e)=>{
            setMessage(e.target.value)
          }} />
          <button className="absolute right-4 text-gray-600 hover:text-gray-800">
            <SendHorizontal size={24} />
          </button>
        </div>
      </div>
      <div className='flex justify-around px-4 my-4'>
        <div className='flex flex-col gap-2 items-center'>
          <div className='rounded-full h-20 w-20 bg-gray-200 flex items-center justify-center overflow-hidden'>
              <Shield color='#2468c2' fill='#2468c2' size={28} />
          </div>
          <h3 className='text-xl font-semibold'>Safety</h3>
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <div className='rounded-full h-20 w-20 bg-gray-200 flex items-center justify-center overflow-hidden'>
              <Map color='#2468c2' fill='#2468c2' size={28} />
          </div>
          <h3 className='text-xl font-semibold'>Share My Trip</h3>
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <div className='rounded-full h-20 w-20 bg-gray-200 flex items-center justify-center overflow-hidden'>
              <Phone color='#2468c2' fill='#2468c2' size={28} />
          </div>
          <h3 className='text-xl font-semibold'>Call Driver</h3>
        </div>
      </div>
      <div className='h-[1px] w-full bg-gray-500 mb-3'></div>
      <div className='w-full flex flex-col p-5'>
        <div className='flex gap-3 items-center mb-2'>
            <div className='rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0'>
                <h5 className='text-black'><i className="ri-map-pin-2-fill text-xl"></i></h5>
            </div>
            <h4 className='text-xl font-base'>
                24B, Near Kapoors Cafe , New Delhi, Uttar Pradesh, India
            </h4>
        </div>
      </div>
    </div>
  )
}

export default DriverFound
