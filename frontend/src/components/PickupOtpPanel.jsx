import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import otpInputImage from '../assets/image/Enter OTP-pana.svg'
import { useDispatch, useSelector } from "react-redux";
import { otpVerified } from "@/features/OTPVerificationSlice";
import { startRide } from "@/features/rideRequestsListSlice";

const PickupOtpPanel = ({ setPickupRidePanelOpen , setOtpPanel , ride }) => {

    const dispatch = useDispatch();

    const handleSubmit = (rideId , otp) => {
      console.log(rideId , otp)
      console.log("Handle Submit is Running")
      dispatch(startRide({rideId , otp}))
      setPickupRidePanelOpen(true)
      setOtpPanel(false)
      dispatch(otpVerified(true))
    }

  return (
    <div className="h-full p-10 flex flex-col items-center">
      <div className="mb-10 w-full h-[40%]">
        <img src={otpInputImage} alt="otp" className="w-full h-full mx-auto" />
      </div>
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="mt-2 w-full">
        <h3 className="text-sm text-gray-400 text-center">Enter otp sent on user registered mobile number</h3>
        <button onClick={() => handleSubmit(ride._id , ride.otp)} className="py-2 flex items-center justify-center text-base font-medium text-white w-full rounded-md mt-10 bg-orange-400">Verfiy</button>
      </div>
    </div>
  );
};

export default PickupOtpPanel;
