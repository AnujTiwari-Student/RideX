import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import CaptainRideDetailPanel from "./CaptainRideDetailPanel";
import { useSelector , useDispatch } from "react-redux";
import { setAcceptedRideIndex, setRideAccepted, setRideAcceptedData, setRideId } from "@/features/rideAcceptedSlice";
import { nanoid } from "@reduxjs/toolkit";

const Request = ({ rideRequestsList , ride , onRemove , totalRequests  , index}) => {


  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [showButton, setShowButton] = useState(false);
  const [rideDetailsPanel, setRideDetailsPanel] = useState(false);

  const {rideAccepted} = useSelector((state)=> state.rideAccepted)
  const {rideId} = useSelector((state)=> state.rideAccepted)
  const {acceptedRideIndex , rideAcceptedData} = useSelector((state)=> state.rideAccepted)

  const rideDetailsPanelRef = useRef(null);

  const handleIgnore = (_id) => {
    onRemove(_id)  
  };

  useEffect(() => {
    if (rideDetailsPanel) {
      gsap.to(rideDetailsPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(rideDetailsPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [rideDetailsPanel]);

  return (
    <div className="pb-4 border-b-2 border-gray-400 bg-white mb-2">
      <div
        onClick={() => {
          setShowButton(!showButton);
        }}
      >
        <div className="flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-6">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src="https://kochhar.com/wp-content/uploads/2021/07/Anuj_Kaila-NEW02-closeup-WEB-FORMAT-.png"
              alt="user-img"
            />
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-lg font-bold">{ride.user.firstname} {ride.user.lastname}</h3>
              <div className="bg-yellow-400 flex items-center justify-center px-8 rounded-xl">
                <p className="font-bold text-sm">{ride.paymentType}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <h3 className="text-lg font-bold">₹{ride.fare}</h3>
            <p className="text-sm">{ride.distance}</p>
          </div>
        </div>
        <div className="border-[1px] border-gray-100 w-full mb-2 mt-4 px-4"></div>

        <div className="w-full flex flex-col px-4">
          <div className="flex gap-3 items-center">
            <div className="rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
              <h5 className="text-black">
                <i className="ri-map-pin-2-fill text-xl"></i>
              </h5>
            </div>
            <h4 className="text-base font-medium">
              {ride?.pickup}
            </h4>
          </div>
        </div>

        <div className="border-[1px] border-gray-100 w-full mb-2 mt-4 px-4"></div>

        <div className="flex gap-3 items-center px-4">
          <div className="rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
            <h5 className="text-black">
              <i className="ri-square-fill text-xl"></i>
            </h5>
          </div>
          <h4 className="text-base font-medium">
          {ride?.destination}
          </h4>
        </div>
      </div>

      <div
        ref={rideDetailsPanelRef}
        className={`fixed -bottom-1 z-10 h-screen w-full bg-white rounded-t-3xl translate-y-full`}
      >
        <CaptainRideDetailPanel
          setRideDetailsPanel={setRideDetailsPanel}
          rideAcceptedData={rideAcceptedData}
          index={index}
          onRemove={handleIgnore}
          totalRequests={totalRequests}
        />
      </div>

      {showButton && (
        <div>
          <div className="border-[1px] border-gray-100 w-full m-4 px-4"></div>
          <div className="px-4 my-2 w-full flex items-center justify-center gap-2">
            {rideAccepted && ride._id === acceptedRideIndex ? (
              <button
                onClick={() => {
                  setRideDetailsPanel(true);
                }}
                className="w-full px-4 py-2 text-black font-semibold rounded-lg bg-orange-400"
              >
                View Location
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    if (totalRequests.length > 1) {
                      handleIgnore(ride._id);
                    } else {
                        handleIgnore(ride._id);
                        navigate("/captain/dashboard");
                    }
                  }}
                  className="w-1/2 px-4 py-2 text-black font-semibold rounded-lg bg-yellow-400"
                >
                  Ignore
                </button>

                <button
                  onClick={() => {
                    setRideDetailsPanel(true);
                    dispatch(setRideAccepted(true));
                    dispatch(setAcceptedRideIndex(ride._id));
                    dispatch(setRideAcceptedData(ride));
                  }}
                  disabled={rideAccepted && ride._id !== acceptedRideIndex}
                  className={`w-1/2 px-4 py-2 text-black font-semibold rounded-lg ${
                    rideAccepted && index !== acceptedRideIndex
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-400"
                  }`}
                >
                  Accept
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Request;
