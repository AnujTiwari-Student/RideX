import React from 'react'

const LookingForDriver = () => {
  return (
    <div>
      <div className='w-full flex justify-center mt-3 mb-4 rounded-t-3xl'>
        <div className='h-2 bg-gray-300 rounded-full w-24'></div>
      </div>
      <h3 className='w-full text-center text-2xl text-gray-700 font-bold tracking-tight mb-2'>Looking for Driver</h3>
      <div className='h-32 w-full flex items-center justify-center mb-4'>
        <img className='h-full w-44' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png" alt="car.png" />
      </div>
      <div className='h-[1px] w-full bg-gray-500 mb-3'></div>
      <div className='w-full flex flex-col p-5'>
        <div className='flex gap-3 items-center mb-2'>
            <div className='rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0'>
                <h5 className='text-black'><i className="ri-map-pin-2-fill text-xl"></i></h5>
            </div>
            <h4 className='text-lg font-semibold'>
                24B, Near Kapoors Cafe , New Delhi, Uttar Pradesh, India
            </h4>
        </div>
        <div className='flex gap-3 items-center mb-3'>
            <div className='rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0'>
                <h5 className='text-black'><i className="ri-square-fill text-xl"></i></h5>
            </div>
            <h4 className='text-lg font-semibold'>
                24B, Near Kapoors Cafe , New Delhi, Uttar Pradesh, India
            </h4>
        </div>
        <div className='flex gap-3 items-center mb-3'>
            <div className='rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0'>
                <h5 className='text-black'><i className="ri-bank-card-2-fill text-xl"></i></h5>
            </div>
            <div className='flex flex-col'>
                <h4 className='text-xl font-semibold'>
                    $99
                </h4>
                <p className='font-medium text-gray-600'>
                    Cash Cash
                </p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LookingForDriver
