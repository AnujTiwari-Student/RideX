import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationPanel = (props) => {

    // console.log(props)

    const location = [
        "24B, Near Kapoors Cafe , New Delhi, Uttar Pradesh, India",
        "18A, Near Tiwari Cafe , Agra, Uttar Pradesh, India",
        "24B, Near Singhania Cafe , New Delhi, Uttar Pradesh, India",
        "24C, Near Malhotra Cafe , New Delhi, Uttar Pradesh, India"
    ]

  return (
    <div className=''>
      {location.map((function(elem , index){
        return <div key={index} onClick={()=>{
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
        }} className='flex gap-4 items-center mb-4'>
        <div className='rounded-full h-10 w-10 bg-gray-400 flex items-center justify-center flex-shrink-0'>
            <h5 className='text-white'><i className="ri-building-3-line"></i></h5>
        </div>
        <h4 className='text-lg'>
            {elem}
        </h4>
      </div>
      }))}
    </div>
  )
}

export default LocationPanel
