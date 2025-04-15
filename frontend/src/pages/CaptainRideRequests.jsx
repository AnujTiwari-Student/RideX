import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Menu } from "lucide-react";
import Request from "@/components/Request";
import CaptainNavBar from "@/components/CaptainNavBar";
import gsap from "gsap";
import { cancelRide, confirmRide } from "@/features/rideRequestsListSlice";
import { setAcceptedRideIndex, setRideAccepted, setRideAcceptedData } from "@/features/rideAcceptedSlice";

const AllRideRequest = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [removedCard, setRemovedCard] = useState([])  

  const { rideRequestsList } = useSelector((state) => state.rideRequestsList);
  const { socket, connected } = useSelector((state) => state.socket);
  useEffect(() => {
    console.log("Ride Requests List at captain dashboard:", rideRequestsList);
  }, [rideRequestsList]);

  useEffect(()=>{
    if(rideRequestsList.length > 0){
      setRemovedCard(rideRequestsList)
    }
  }, [rideRequestsList])  

  const handleRemove = (_id)=>{
    console.log("Removing ride with ID:", _id);
    dispatch(cancelRide(_id)) 
    setRemovedCard((prevRequest)=> prevRequest.filter((ride)=> ride._id !== _id))
  }


  const handleRideAccept = (ride) => {
    if (socket && connected) {
      dispatch(confirmRide(ride._id))
        .unwrap()
        .then((res) => {
          console.log("Ride confirmed successfully on backend:", res);
          dispatch(setRideAccepted(true));
          dispatch(setAcceptedRideIndex(ride._id));
          dispatch(setRideAcceptedData(ride));
        })
        .catch((err) => {
          console.log("Error confirming ride:", err);
        });
    }
  };

  const [menuOpen, setMenuOpen] = useState(false)
  
    const menuRef = useRef(null);
  
    useEffect(() => {
      if (menuOpen) {
        gsap.to(menuRef.current, {
          x: 0, 
          duration: 0.3,
          ease: "power2.out", 
        });
      } else {
        gsap.to(menuRef.current, {
          x: "-100%",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }, [menuOpen]);

  return (
    <div className="h-screen overflow-y-scroll">
      <div className="px-4 py-4 w-full flex items-center justify-between bg-white shadow-md">
        <div onClick={()=>{
          setMenuOpen(true)
        }} className="w-max">
          <Menu />
        </div>
        <div
          onClick={() => {
            navigate("/captain/dashboard");
          }}
        >
          <ArrowLeft />
        </div>
      </div>
      <div className="bg-orange-400 py-3 flex jsutify-center text-lg text-black font-semibold px-4">
        You have {removedCard.length} new requests.
      </div>
      <div className="ride-requests-container bg-gray-200">
        {removedCard.map((ride, index) => (
          <Request key={ride._id} handleRideAccept={handleRideAccept} rideRequestsList={rideRequestsList} index={index} ride={ride} onRemove={handleRemove} totalRequests={removedCard} />
        ))}
      </div>
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 z-10 w-[80%] bg-white h-full translate-x-full`}
      >
        <CaptainNavBar setMenuOpen={setMenuOpen} />
      </div>
    </div>
  );
};

export default AllRideRequest;
