import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Menu } from "lucide-react";
import Request from "@/components/Request";
import CaptainNavBar from "@/components/CaptainNavBar";
import gsap from "gsap";
import { createRide, deleteRide } from "@/features/rideRequestsListSlice";

const AllRideRequest = () => {
  const rideRequests = [
    {
      id: 1,
      user: {
        name: "Anuj Tiwari",
        rating: 4.8,
        image: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      paymentType: "Cash",
      fare: 25.0,
      distance: "2.2 km",
      pickup: {
        address: "24B, Near Kapoors Cafe, New Delhi",
        lat: 28.6129,
        lng: 77.2295,
      },
      dropoff: {
        address: "Connaught Place, New Delhi",
        lat: 28.6328,
        lng: 77.2197,
      },
      timestamp: "2023-07-25T10:30:00",
    },
    {
      id: 2,
      user: {
        name: "Rahul Sharma",
        rating: 4.5,
        image: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      paymentType: "Card",
      fare: 18.5,
      distance: "1.8 km",
      pickup: {
        address: "DLF Cyber City, Gurugram",
        lat: 28.4962,
        lng: 77.0943,
      },
      dropoff: {
        address: "MG Road Metro Station, Gurugram",
        lat: 28.4831,
        lng: 77.0964,
      },
      timestamp: "2023-07-25T10:35:00",
    },
    {
      id: 3,
      user: {
        name: "Priya Singh",
        rating: 4.9,
        image: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      paymentType: "Cash",
      fare: 32.0,
      distance: "3.5 km",
      pickup: {
        address: "India Gate, New Delhi",
        lat: 28.6129,
        lng: 77.2295,
      },
      dropoff: {
        address: "Lotus Temple, New Delhi",
        lat: 28.5535,
        lng: 77.2588,
      },
      timestamp: "2023-07-25T10:40:00",
    },
    {
      id: 4,
      user: {
        name: "Amit Patel",
        rating: 4.7,
        image: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      paymentType: "Card",
      fare: 22.75,
      distance: "2.7 km",
      pickup: {
        address: "Select Citywalk Mall, Saket",
        lat: 28.5275,
        lng: 77.219,
      },
      dropoff: {
        address: "Hauz Khas Village, New Delhi",
        lat: 28.5512,
        lng: 77.1933,
      },
      timestamp: "2023-07-25T10:45:00",
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [removedCard, setRemovedCard] = useState([])

  

  const rideRequestsList = useSelector((state) => state.rideRequestsList.rideRequestsList);
  useEffect(() => {
    console.log("Ride Requests List at captain dashboard:", rideRequestsList);
  }, [rideRequestsList]);

  useEffect(()=>{
    if(rideRequestsList.length > 0){
      setRemovedCard(rideRequestsList)
    }
  }, [rideRequestsList])

  // console.log("removedCard", removedCard);
  

  const handleRemove = (_id)=>{
    console.log("Removing ride with ID:", _id);
    dispatch(deleteRide(_id)) 
    setRemovedCard((prevRequest)=> prevRequest.filter((ride)=> ride._id !== _id))
  }

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

  useEffect(()=>{
      if(!rideRequests.length > 1){
          return navigate('/incoming-ride')
      }
  },[])

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
          <Request key={ride._id} rideRequestsList={rideRequestsList} index={index} ride={ride} onRemove={handleRemove} totalRequests={removedCard} />
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
