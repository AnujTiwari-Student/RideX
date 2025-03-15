import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentMethod } from '../features/paymentSlice';
import {Check , CircleDollarSign , CreditCard} from 'lucide-react'
import Switch from '@mui/material/Switch/Switch';

const PaymentMethod = () => {

    const paymentMethod = useSelector((state)=>state.payment.paymentMethod)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSelect = (method) => {
        dispatch(setPaymentMethod(method));
        navigate("/ride-details");
    };

  return (
    <div className="h-screen flex flex-col px-4 py-4">
      <h2 className="text-2xl font-bold mb-6">Choose Payment Method</h2>
      <div className='rounded-3xl bg-black text-white w-max py-4 px-8 mb-8 font-semibold'><i className="ri-user-3-fill"></i> Personal</div>
      <h3 className='text-2xl font-semibold'>RideX Balance</h3>
      <div className='my-8 flex items-center justify-between'>
        <div className='flex gap-4 items-center'>
            <div className='bg-black p-3 w-max text-white text-sm'>RideX</div>
            <div className='flex flex-col'>
                <h5 className='text-base font-medium'>RideX Balance</h5>
                <h6 className='text-base font-medium'>$0.00</h6>
            </div>
        </div>
        <Switch size='large' disabled defaultChecked />
      </div>
      <h4 className='text-2xl font-semibold mb-8'>Payments Methods</h4>
      <div onClick={()=>{
            handleSelect("Cash Cash")
          }} className='flex items-center justify-between'>
        <div className='flex gap-8 items-center'>
          <i className="ri-cash-line text-green-600 text-4xl"></i>
          <h5 className='text-xl font-semibold'>Cash</h5>
        </div>
        {paymentMethod === "Cash Cash" && <Check />}
      </div>
      <div onClick={()=>{
            handleSelect("UPI")
          }} className='flex items-center justify-between'>
        <div className='flex gap-10 items-center my-8'>
          <CircleDollarSign color='green' size={32}/>
          <h5 className='text-xl font-semibold'>UPI</h5>
        </div>
        {paymentMethod === "UPI" && <Check />}
      </div>
      <div onClick={()=>{
            handleSelect("Cards")
          }} className='flex items-center justify-between'>
        <div className='flex gap-10 mb-8 items-center'>
          <CreditCard color='green' size={32}/>
          <h5 className='text-xl font-semibold'>Credit/Debit Card</h5>
        </div>
        {paymentMethod === "Cards" && <Check />}
      </div>
      <h4 className='text-2xl font-semibold mb-8'>Vouchers</h4>
      <div className='flex gap-10 items-center'>
        <p className='text-3xl font-semibold mx-2'>+</p>
        <h5 className='text-xl font-semibold'>Add Voucher</h5>
      </div>

    </div>
  )
}

export default PaymentMethod
