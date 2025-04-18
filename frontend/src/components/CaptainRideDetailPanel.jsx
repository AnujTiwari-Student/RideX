import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, MessageSquareMore, Phone, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAcceptedRideIndex, setRideAccepted, setRideAcceptedData } from "@/features/rideAcceptedSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import MessagePanel from "./MessagePanel";
import gsap from "gsap";
import { cancelRide, rideArriving } from "@/features/rideRequestsListSlice";
import { setCurrentLocation, setPickupPoint } from "@/features/trackingLocationSlice";

const CaptainRideDetailPanel = ({
  setRideDetailsPanel,
  rideAcceptedData,
  rideDetailsPanel
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { otpSubmitted } = useSelector((state) => state.otpVerification);
  const { lastLocation } = useSelector((state) => state.socket);

  const [messagePanelOpen, setMessagePanelOpen] = useState(false);

  const messagePanelRef = useRef(null);

  console.log("Ride Accepted Data Destination:", rideAcceptedData?.destination);

  useEffect(()=>{

    dispatch(setPickupPoint(rideAcceptedData))
    dispatch(setCurrentLocation(lastLocation))
    console.log("Last Location:", lastLocation);

  } , [rideAcceptedData])

  let discount = 10; 
  let totalFare = rideAcceptedData?.fare - discount; 

  useEffect(() => {
    console.log("Ride Accepted Data:", rideAcceptedData?._id);
  }, [rideAcceptedData]);

  useEffect(() => {
    if(messagePanelOpen){
      gsap.to(messagePanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(messagePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
    }, [messagePanelOpen])

  const handleCancelRide = (ride) => {
    dispatch(cancelRide(ride?._id))
    .unwrap()
    .then(() => {
      setRideDetailsPanel(false);
      dispatch(setRideAccepted(false));
      dispatch(setAcceptedRideIndex(null))
      dispatch(setRideAcceptedData(null));
      toast.success("Ride cancelled successfully");
    }).catch((error) => {
      console.log("Error cancelling ride:", error);
    });
  };

  const handleRideArriving = (rideId) => {
    if(rideDetailsPanel){
      dispatch(rideArriving(rideId))
    .unwrap()
    .then(() => {
      // toast.success("Ride arriving");
      navigate("/captain/pickup-in-progress")
    })
    }
  }

  return (
    <div className="h-full overflow-scroll">
      <div className="py-4 px-4 flex items-center gap-12">
        <div
          onClick={() => {
            setRideDetailsPanel(false);
          }}
        >
          <ArrowLeft />
        </div>
        <h2 className="text-xl font-bold">Ride Details</h2>
      </div>

      <div className="mb-4 border-2 border-gray-200"></div>

      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://kochhar.com/wp-content/uploads/2021/07/Anuj_Kaila-NEW02-closeup-WEB-FORMAT-.png"
            alt="user-img"
          />
          <div className="flex flex-col items-start">
            <h3 className="text-base font-bold">{rideAcceptedData?.user?.firstname} <span>{rideAcceptedData?.user?.lastname}</span></h3>
            <p className="font-semibold text-sm text-gray-500">Ride</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <h3 className="text-base font-bold tracking-tighter">₹ {rideAcceptedData?.fare}.00</h3>
          <p className="text-sm text-gray-500 font-semibold">{rideAcceptedData?.distance}</p>
        </div>
      </div>
      <div className="border-[1px] border-gray-100 w-full mb-2 mt-4 px-4"></div>

      <div className="w-full flex flex-col px-4">
        <div className="flex gap-3 items-center">
          <div className="rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
            <h5 className="text-black">
              <i className="ri-map-pin-2-fill text-md"></i>
            </h5>
          </div>
          <h4 className="text-sm font-medium">
            {rideAcceptedData?.pickup}
          </h4>
        </div>
      </div>

      <div className="border-[1px] border-gray-100 w-full mb-2 mt-4 px-4"></div>

      <div className="flex gap-3 items-center px-4">
        <div className="rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
          <h5 className="text-black">
            <i className="ri-square-fill text-md"></i>
          </h5>
        </div>
        <h4 className="text-sm font-medium">
          {rideAcceptedData?.destination}
        </h4>
      </div>

      <div className="border-[1px] border-gray-100 w-full mb-2 mt-4 px-4"></div>

      <div className="px-4">
        <p className="font-semibold text-gray-400 pb-2">Note</p>
        <p className="text-sm">
          Your currentIndex is used to track which ride request is currently
          being displayed. When the "Ignore" button is clicked, it increments
          currentIndex, moving to the next ride request.
        </p>
      </div>

      <div className="border-[1px] border-gray-100 w-full mb-2 mt-4 px-4"></div>

      <div className="px-4">
        <p className="font-semibold text-gray-400 pb-2">Total Fare</p>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold">Amount</p>
            <p className="text-sm font-bold tracking-tighter">₹ {rideAcceptedData?.fare}.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold">Discount</p>
            <p className="text-sm font-bold">₹ {discount}.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold">Total</p>
            <p className="text-sm font-bold">₹ {totalFare}.00</p>
          </div>
        </div>
      </div>

      <div className="border-[1px] border-gray-100 w-full mb-2 mt-4 px-4"></div>

      {!otpSubmitted && (
        <div className="flex items-center justify-between px-4 my-6">
        <div className="flex flex-col py-3 gap-1 w-24 items-center rounded-xl bg-green-400">
          <Phone size={20} />
          <p className="text-sm  font-medium">Call</p>
        </div>
        <div onClick={()=>{
          setMessagePanelOpen(true);
        }} className="flex flex-col py-3 gap-1 w-24 items-center rounded-xl bg-blue-400">
          <MessageSquareMore size={20} />
          <p className="text-sm  font-medium">Message</p>
        </div>
        <div
          onClick={() => {
            handleCancelRide(rideAcceptedData);
          }}
          className="flex flex-col py-3 gap-1 w-24 items-center rounded-xl bg-gray-400"
        >
          <Trash2 size={20} />
          <p className="text-sm  font-medium">Cancel</p>
        </div>
      </div>
      )}

      {!otpSubmitted && <div className="border-[1px] border-gray-100 w-full mb-12 mt-4 px-4"></div>}

      <div className="px-4 w-full absolute bottom-2 bg-white py-2">
        <button onClick={()=>handleRideArriving(rideAcceptedData?._id)} className="bg-orange-400 w-full flex items-center justify-center py-2 rounded-xl font-semibold text-white">
          Pick Up
        </button>
      </div>

      <div
        ref={messagePanelRef}
        className={`fixed -bottom-1 z-10 h-screen w-full bg-white rounded-t-3xl translate-y-full`}
      >
        <MessagePanel setMessagePanelOpen={setMessagePanelOpen} />
      </div>
    </div>
  );
};

export default CaptainRideDetailPanel;
