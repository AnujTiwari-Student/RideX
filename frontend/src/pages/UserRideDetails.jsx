import React, { useEffect, useRef, useState } from "react";
import { Phone, Map, Shield, Star , SendHorizontal , ChevronRight , House } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import gsap from "gsap";
import MessagePanel from "@/components/MessagePanel";

const Riding = () => {

  const paymentMethod = useSelector((state)=> state.payment.paymentMethod)
  const [messagePanelOpen, setMessagePanelOpen] = useState(false);

  const messagePanelRef = useRef(null);

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

  return (
    <div className="h-screen p-0 m-0">
      <Link to='/account' className="flex items-center justify-center bg-white rounded-full p-4 absolute top-2 right-2">
          <House />
      </Link>
      <div className="h-1/2 w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://i2-prod.mylondon.news//article16106961.ece/ALTERNATES/s1200b/2_Uber-pink-cars.jpg"
          alt="map-image"
        />
      </div>

      <div className="h-1/2 mx-4">
        <div className="w-full flex justify-between items-center my-6">
          <div className="flex relative w-max">
            <div className="h-16 w-16 overflow-hidden z-10">
              <img
                className="h-full w-full rounded-full"
                src="https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png"
                alt="car.png"
              />
            </div>
            <div className="h-16 w-16 absolute left-14">
              <img
                className="h-full rounded-full w-full"
                src="https://www.pngplay.com/wp-content/uploads/7/Black-Car-Transparent-Background.png"
                alt="car.png"
              />
            </div>
          </div>

          <div className="flex flex-col items-end">
            <h3 className="text-gray-600 font-bold text-large">Anuj Tiwari</h3>
            <h2 className="text-xl font-bold">KA15AK00-0</h2>
            <h6 className="text-gray-500 font-semibold text-sm">
              Gray Mercedes S-Presso LXI
            </h6>
          </div>
        </div>

        <div className="relative flex justify-between items-center gap-8 w-full mb-6">
          <div className="relative flex items-center bg-gray-200 rounded-xl w-full px-4 py-3">
            <input
              type="text"
              placeholder="Send Message...."
              className="px-4 py-1 outline-none w-[90%]"
              onFocus={(e) => {
                e.preventDefault();
                setMessagePanelOpen(true);
              }}
            />
            <button className="absolute right-4 text-gray-600 hover:text-gray-800">
              <SendHorizontal size={24} />
            </button>
          </div>
          <div>
            <Phone />
          </div>
        </div>

        <div className="w-full border-gray-200 border-1 my-4"></div>

        <div className="w-full flex flex-col">
          <div className="flex gap-3 items-center mb-3">
            <div className="rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
              <h5 className="text-black">
                <i className="ri-square-fill text-xl"></i>
              </h5>
            </div>
            <h4 className="text-lg font-semibold">
              24B, Near Kapoors Cafe , New Delhi, Uttar Pradesh, India
            </h4>
          </div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-3 items-center">
              <div className="rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                <h5 className="text-black">
                  <i className="ri-bank-card-2-fill text-xl"></i>
                </h5>
              </div>
              <div className="flex flex-col">
                <h4 className="text-xl font-semibold">$99</h4>
                <p className="font-medium text-gray-600">{paymentMethod}</p>
              </div>
            </div>
            <Link to='/user/payment-method'><ChevronRight /></Link>
          </div>
        </div>
        {paymentMethod !== "Cash Cash" && (
          <button
            className="w-full py-3 rounded-xl bg-black text-white"
            onClick={() => {
              window.location.href = "/user/checkout/stripe";
            }}
          >
            Pay Now
          </button>
        )}
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

export default Riding;
