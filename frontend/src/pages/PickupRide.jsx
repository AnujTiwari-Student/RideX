import React, { useEffect, useRef, useState } from "react";
import mapImage from "../assets/image/Map.jpeg";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import PickupOtpPanel from "@/components/PickupOtpPanel";
import { useDispatch, useSelector } from "react-redux";
import { setDriverReached } from "@/features/driverReachedSlice";
import { otpVerified } from "@/features/OTPVerificationSlice";
import LiveTracking from "@/components/LiveTracking";
import { getLocationCoordinates } from "@/features/trackingLocationSlice";

const PickupRide = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { otpSubmitted } = useSelector((state) => state.otpVerification);
  const { driverReached } = useSelector((state) => state.driverReached);
  const lastLocation = useSelector((state) => state.socket.lastLocation);
  const { ride } = useSelector((state) => state.rideRequestsList);
  const { pickupPoint, pickupPointCoordinates } = useSelector(
    (state) => state.locationTracking
  );

  useEffect(() => {
    dispatch(getLocationCoordinates(pickupPoint?.pickup));
  }, [pickupPoint]);

  console.log("Pickup Point:", pickupPoint);
  console.log("Last Location:", lastLocation);
  console.log("Pickup Point Coordinates:", pickupPointCoordinates);

  const [pickupRidePanelOpen, setPickupRidePanelOpen] = useState(false);
  const [otpPanel, setOtpPanel] = useState(false);
  const [pointReached, setPointReached] = useState(false);

  const pickupRidePanelRef = useRef(null);
  const otpPanelRef = useRef(null);

  useEffect(() => {
    if (pickupRidePanelRef.current) {
      gsap.to(pickupRidePanelRef.current, {
        height: pickupRidePanelOpen ? "85%" : "0%",
        duration: pickupRidePanelOpen ? 10 : 1,
        ease: "linear",
      });
    }

    if (otpPanelRef.current) {
      gsap.to(otpPanelRef.current, {
        transform: otpPanel ? "translateY(0)" : "translateY(100%)",
      });
    }
  }, [otpPanel, pickupRidePanelOpen]);

  return (
    <div className="h-screen scroll-y-hidden overflow-hidden">
      <div className="w-full flex justify-center items-center gap-10 bg-white px-4 pt-2 pb-4">
        {/* <div
          onClick={() => {
            navigate("/captain/ride-requests");
          }}
          className="w-max"
        >
          <ArrowLeft />
        </div> */}
        <p className="text-xl font-bold">Pickup</p>
      </div>
      <div className="w-full h-full">
        <LiveTracking
          destination={pickupPointCoordinates}
          start={lastLocation}
        />
      </div>
      <div
        className={`${
          pickupRidePanelOpen ? "h-max" : "h-0"
        } w-full fixed bottom-0 flex flex-col justify-end`}
      >
        <div className={`bg-white px-4 ${pickupRidePanelOpen ? 'pt-4' : 'pt-4'} pb-4 w-full rounded-t-3xl h-max`}>
          <div className="w-full flex justify-center items-center">
            <div
              onClick={() => {
                setPickupRidePanelOpen(!pickupRidePanelOpen);
              }}
              className="bg-gray-400 h-[5px] w-20 rounded-xl"
            ></div>
          </div>
          <div className="w-full flex gap-8 items-center mt-4">
            <div>
              <h4 className="text-base font-medium text-gray-600 mb-2">Pickup</h4>
              <h6 className="text-xs font-semibold"> {ride?.pickup} </h6>
              <h4 className="text-base font-medium text-gray-600 my-2">Drop Off</h4>
              <h6 className="text-xs font-semibold"> {ride?.destination} </h6>
            </div>
            {/* <button
              onClick={() => {
                dispatch(otpVerified(false)),
                  dispatch(setDriverReached(false)),
                  setPointReached(false);
              }}
            >
              Hi
            </button> */}
          </div>
          {!pointReached && !otpSubmitted && (
            <button
              onClick={() => {
                dispatch(setDriverReached(true));
                setPointReached(true);
                setOtpPanel(true);
              }}
              className="bg-orange-400 font-medium text-white w-full py-2 rounded-lg mt-4"
            >
              Reached Pickup Point
            </button>
          )}
        </div>
        {otpSubmitted && (
          <div
            ref={pickupRidePanelRef}
            className="overflow-hidden bg-white px-4 pb-4"
          >
            <div className="flex justify-around items-center mt-4">
              <div className="flex flex-col items-center">
                <p className="text-base font-medium text-gray-500">Requested</p>
                <h6 className="text-lg font-bold"> {ride?.user?.firstname} </h6>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-base font-medium text-gray-500">Distance</p>
                <h6 className="text-lg font-bold"> {ride?.distance}</h6>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-base font-medium text-gray-500">Fare</p>
                <h6 className="text-lg font-bold"> ₹{ride?.fare} </h6>
              </div>
            </div>
            <button className="bg-orange-400 font-medium text-white w-full py-2 rounded-lg mt-4">
              Drop Off
            </button>
          </div>
        )}
      </div>
      <div
        ref={otpPanelRef}
        className={`fixed bottom-0 z-10 w-full h-screen bg-white rounded-t-3xl translate-y-full`}
      >
        <PickupOtpPanel
          ride={ride}
          setPickupRidePanelOpen={setPickupRidePanelOpen}
          setOtpPanel={setOtpPanel}
        />
      </div>
    </div>
  );
};

export default PickupRide;
