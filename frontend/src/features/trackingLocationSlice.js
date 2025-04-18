import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    pickupPoint: "",
    pickupPointCoordinates: null,
    destinationPoint: null,
    currentLocation: null,
    dropOff: null,
};

export const getLocationCoordinates = createAsyncThunk(
    "trackingLocation/trackingLocation",
    async (address, { dispatch , rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No authentication token found!");
                return rejectWithValue({ message: "No authentication token" });
            }
            console.log("Address:", address);
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/maps/location`,
                {
                    params: { address },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("API Response Coordinates:", response.data);
            dispatch(setPickupPointCoordinates(response.data));
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                console.error("API Error:", error.response.data);
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({
                    message: "An unexpected error occurred",
                });
            }
        }
    }
)

const trackingLocation = createSlice({
    name: "trackingLocation",
    initialState,
    reducers: {
        setPickupPoint: (state, action) => {
            state.pickupPoint = action.payload;
        },
        setDestinationPoint: (state , action) => {
            state.destinationPoint = action.payload;
        },
        setCurrentLocation: (state, action) => {
            state.currentLocation = action.payload;
        },
        setDropOff: (state, action) => {
            state.dropOff = action.payload;
        },
        setPickupPointCoordinates: (state, action) => {
            state.pickupPointCoordinates = action.payload;
        }
}})

export const { setPickupPoint, setDestinationPoint, setCurrentLocation, setDropOff, setPickupPointCoordinates } = trackingLocation.actions;

export default trackingLocation.reducer;