import React from 'react'
import img from '../assets/image/Flux_Dev_A_vibrant_and_modern_homepage_image_inspired_by_Ubers_0.jpeg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='h-screen w-full flex flex-col justify-between'>
            <img className='h-full' src={img} alt="" />
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with RideX</h2>
                <Link to='/login' className='inline-block w-full bg-black text-white py-3 rounded-md mt-8 text-center'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home
