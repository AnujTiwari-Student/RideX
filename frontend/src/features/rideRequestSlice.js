import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rideRequest: [],
    serverResponse: null,
};

const rideRequestSlice = createSlice({
    name: "rideRequest",
    initialState,
    reducers: {
        setRideRequest: (state, action) => {
            state.rideRequest = action.payload;
        },
        setServerResponse: (state, action) => {
            state.serverResponse = action.payload;
        }
}})

export const { setRideRequest, setServerResponse } = rideRequestSlice.actions;

export default rideRequestSlice.reducer;