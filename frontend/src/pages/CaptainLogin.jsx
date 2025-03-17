import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import { captainLogin } from '@/features/captainSlice'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'
import gsap from 'gsap'

const CaptainLogin = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {loading , isAuthenticated} = useSelector((state) => state.captain);

  const loaderRef = useRef(null)

  const [captainData, setCaptainData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event)=>{
    setCaptainData({ ...captainData, [event.target.name]: event.target.value })
  }

  React.useEffect(() => {
    if (loading) {
      gsap.to(loaderRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "linear",
      });
    } else {
      gsap.killTweensOf(loaderRef.current);
      gsap.set(loaderRef.current, { rotation: 0 });
    }
  }, [loading]);

  const handleSubmit = async (event)=>{
    event.preventDefault()
    dispatch(captainLogin(captainData))
    .unwrap().then((res)=>{
      navigate('/captain/dashboard')
      toast.success('Login Successful')
    }).catch(err => {
      toast.error('Failed to log in, please check your credentials')
      console.log(err);
    })
  }

  return (
    <>
      <div className='flex h-screen justify-between flex-col'>
        <div className='container pt-10 px-6'>
          <form action="" onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label htmlFor='email' className='text-xl font-semibold'>What's our Captain email address</label>
                <input id='email' type="email" name="email" value={captainData.email} onChange={handleChange} required placeholder='email@example.com' className='border-1 border-gray-400 rounded-md px-4 w-full outline-none py-2 mt-2' />
            </div>
            <div className='mb-6'>
                <label htmlFor='password' className='text-xl font-semibold'>Enter password</label>
                <input id='password' type="password" name="password" value={captainData.password} onChange={handleChange} placeholder='Password' required className='border-1 border-gray-400 rounded-md px-4 w-full outline-none py-2 mt-2' />
            </div>
            <button className='bg-black w-full rounded-md font-semibold tracking-wider text-center text-white py-[8px]'>
              {loading ? (
                <div className='flex w-full items-center justify-center'>
                  <Loader ref={loaderRef} size={24}/>
                </div>
              ) : 'Login'}
            </button>
          </form>
          <p className='text-center mt-4 font-medium text-base'>Join a fleet ! <Link to="/captain-signup" className='text-blue-500'>Register as a Captain</Link></p>
        </div>
        <div className='container px-6 z-50 mb-4'>
          <Link to="/login" className='flex justify-center items-center mt-4 bg-orange-500 w-full rounded-md font-semibold tracking-wider text-center text-white py-[8px]'>Login As User</Link>
        </div>
      </div>
    </>
  )
} 

export default CaptainLogin
