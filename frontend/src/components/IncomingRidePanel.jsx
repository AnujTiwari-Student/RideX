import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LocateFixed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CaptainRideDetailPanel from "./CaptainRideDetailPanel";
import gsap from "gsap";
import { cancelRide, confirmRide, deleteRide, fetchAllRides } from "@/features/rideRequestsListSlice";
import { useDispatch, useSelector } from "react-redux";
import { setAcceptedRideIndex, setRideAccepted, setRideAcceptedData } from "@/features/rideAcceptedSlice";
import toast from "react-hot-toast";

const IncomingRidePanel = ({
  rideRequestsList = [],
  paymentMethod,
  setIncomingRidePanel
}) => {

  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  const [rideDetailsPanel, setRideDetailsPanel] = useState(false);
  const {rideAccepted , rideAcceptedData, acceptedRideIndex} = useSelector((state)=> state.rideAccepted)
  const { socket , connected } = useSelector((state)=> state.socket)
  
  const dispatch = useDispatch();

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

  const rideDetailsPanelRef = useRef(null);

  const latestRide = rideRequestsList[rideRequestsList.length - 1];

  useEffect(()=>{
    console.log("latest ride", latestRide)
    console.log("Latest Ride ID:", latestRide?._id);
  }, [latestRide])

  const handleIgnore = (ride) => {
    console.log("Ignoring ride:", ride._id);
    dispatch(cancelRide(ride._id));
  };

  useEffect(() => {
    if (rideRequestsList.length === 0) {
      setIncomingRidePanel(false);
    }else if (rideRequestsList.length === 1) {
      setIncomingRidePanel(true);
    }
  }, [rideRequestsList]);

  const handleAccept = (ride) => {
    if (socket && connected) {
      console.log("Accepting ride:", ride._id);
      dispatch(confirmRide(ride._id))
        .unwrap()
        .then((res) => {
          console.log("Ride confirmed successfully on backend:", res);
          toast.success("Ride accepted successfully");
          dispatch(setRideAccepted(true));
          dispatch(setAcceptedRideIndex(ride._id));
          dispatch(setRideAcceptedData(ride));
          setRideDetailsPanel(true);
        })
        .catch((err) => {
          console.error("Error confirming ride:", err);
        });
    }
  };
  

  useEffect(()=>{
    console.log("Accepted Ride Data:", rideAcceptedData);
  }, [rideAcceptedData])

  const handleViewDetails = () => {
    if (!latestRide) return;
    console.log("Viewing ride details Only:", latestRide?._id);
    console.log("Ride Accepted Data:", rideAcceptedData);
    setRideDetailsPanel(true);
  };  

  useEffect(() => {
    setCurrentIndex(0); // Reset to latest when list updates
  }, [rideRequestsList.length]);

  return (
    <>
      <div className="w-full">
        <div className="bg-white rounded-t-3xl pt-3 pb-3 px-4">
          <div
            onClick={() => {
              setIncomingRidePanel(false);
            }}
            className="w-full flex justify-center mb-4 rounded-t-3xl"
          >
            <div className="h-2 bg-gray-300 rounded-full w-24"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center py-2 gap-6">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src="https://kochhar.com/wp-content/uploads/2021/07/Anuj_Kaila-NEW02-closeup-WEB-FORMAT-.png"
                alt="user-img"
              />
              <div className="flex flex-col items-start gap-1">
                <h3 className="text-lg font-bold">
                  {latestRide?.user?.firstname}{" "}
                  <span className="text-lg font-bold">
                    {latestRide?.user?.lastname}
                  </span>
                </h3>
                <div className="bg-yellow-400 flex items-center justify-center px-5 rounded-xl">
                  <p className="font-semibold text-xs pb-[2px]">Ride</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <h3 className="text-lg font-bold tracking-tighter">₹ {latestRide?.fare}</h3>
              <p className="text-sm">{latestRide?.distance}</p>
            </div>
          </div>

          <div className="border-[1px] border-gray-100 w-full mb-2 mt-4"></div>

          <div className="w-full flex flex-col">
            <div className="flex gap-3 items-center">
              <div className="rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                <h5 className="text-black">
                  <i className="ri-map-pin-2-fill text-xl"></i>
                </h5>
              </div>
              <h4 className="text-base font-medium">{latestRide?.pickup}</h4>
            </div>
          </div>

          <div className="border-[1px] border-gray-100 w-full mb-2 mt-4"></div>

          <div className="flex gap-3 items-center">
            <div className="rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
              <h5 className="text-black">
                <i className="ri-square-fill text-xl"></i>
              </h5>
            </div>
            <h4 className="text-base font-medium">{latestRide?.destination}</h4>
          </div>

          <div className="border-[1px] border-gray-100 w-full mb-2 mt-4"></div>

          {
  rideRequestsList.length > 1 ? (
    latestRide ? (
      <div className="bg-black text-white text-center px-8 py-3 rounded-xl">
        <button onClick={() => 
          navigate("/captain/ride-requests")
        }>
          See All Requests
        </button>
      </div>
    ) : null
  ) : (
    <div className="items-center flex justify-end gap-5">
      {rideAccepted && latestRide?._id === acceptedRideIndex ? null : (
        <button
          onClick={() => handleIgnore(latestRide)}
          className="font-bold text-gray-500 text-lg"
        >
          Ignore
        </button>
      )}
      <button
        onClick={() => {
          if (!rideAccepted) {
            handleAccept(latestRide);
          } else {
            handleViewDetails();
          }
        }}
        className="bg-black text-white px-8 py-3 rounded-xl"
      >
        {rideAccepted && latestRide?._id === acceptedRideIndex ? "View" : "Accept"}
      </button>
    </div>
  )
}

        </div>
      </div>

      <div
        ref={rideDetailsPanelRef}
        className={`fixed bottom-0 z-10 h-screen w-full bg-white rounded-t-3xl translate-y-full`}
      >
        <CaptainRideDetailPanel
          setRideDetailsPanel={setRideDetailsPanel}
          rideDetailsPanel={rideDetailsPanel}
          rideAcceptedData={rideAcceptedData}
          paymentMethod={paymentMethod}
        />
      </div>
    </>
  );
};

export default IncomingRidePanel;
