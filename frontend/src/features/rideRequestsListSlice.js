import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rideRequestsList: [],
    serverResponse: null,
};

const rideRequestsListSlice = createSlice({
    name: "rideRequestsList",
    initialState,
    reducers: {
        setRideRequestList: (state, action) => {
            state.rideRequestsList = action.payload;
        },
        setServerResponse: (state, action) => {
            state.serverResponse = action.payload;
        }
}})

export const { setRideRequestList, setServerResponse } = rideRequestsListSlice.actions;

export default rideRequestsListSlice.reducer