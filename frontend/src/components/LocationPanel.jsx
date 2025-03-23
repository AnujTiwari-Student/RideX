import { getFare } from '@/features/rideRequestsListSlice';
import { clearLocationSuggestion, locationSuggestion } from '@/features/userLocationSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'remixicon/fonts/remixicon.css';

const LocationPanel = ({ setVehiclePanel, setPanelOpen , setUserLocation , focusField , panelOpen , handleSubmit , userLocation }) => {

    const dispatch = useDispatch();

    const  suggestedLocation  = useSelector((state) => state.userLocation.locationSuggestion);

    const [suggestion, setSuggestion] = useState([])

    console.log(suggestedLocation);
    const locations = Array.isArray(suggestedLocation) ? suggestedLocation : [];

    const isButtonEnabled = userLocation?.pickup && userLocation?.destination;

    return (
        <div className="mt-8">
            <div className="max-h-[60vh] overflow-y-auto px-4">
                {locations.length > 0 ? (
                    locations.map((elem, index) => (
                        <div
                            key={elem.place_id  || index}
                            onClick={()=>{
                                setUserLocation((prev)=>({
                                    ...prev,
                                    [focusField]: elem.description || elem.structured_formatting?.main_text
                                }))
                                dispatch(clearLocationSuggestion([]))
                            }}
                            className="flex gap-4 items-center mb-4 cursor-pointer"
                        >
                            <div className="rounded-full h-8 w-8 bg-gray-400 flex items-center justify-center flex-shrink-0">
                                <h5 className="text-white">
                                    <i className="ri-building-3-line"></i>
                                </h5>
                            </div>
                            <h4 className="text-base font-semibold">{elem.description || elem.structured_formatting?.main_text || "Unknown Location"}</h4>
                        </div>
                    ))
                ) : null}
            </div>


            {panelOpen  && isButtonEnabled && (
                <div className="absolute bg-white bottom-0 left-0 w-full p-4 shadow-md">
                    <button 
                        onClick={(e)=>{
                            handleSubmit(e);
                            setPanelOpen(false);
                            setVehiclePanel(true);
                            dispatch(clearLocationSuggestion([]))
                            dispatch(getFare(userLocation))
                        }} 
                        className="flex justify-center items-center text-base font-semibold text-white w-full py-2 rounded-md bg-black"
                    >
                        Book Ride
                    </button>
                </div>
            )}
        </div>
    );
};

export default LocationPanel;
