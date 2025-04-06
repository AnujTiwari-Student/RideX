import { createAsyncThunk, createSlice , nanoid } from "@reduxjs/toolkit";

const initialState = {
    rideAccepted: false,
    rideAcceptedData: null,
    rideId: nanoid(),
    loading: false,
    error: null,
    acceptedRideIndex: null,
};

const rideAcceptedSlice = createSlice({
    name: "rideAccepted",
    initialState,
    reducers: {
        setRideAccepted: (state , action)=>{
            state.rideAccepted = action.payload
        },
        setRideAcceptedData: (state , action)=>{
            state.rideAcceptedData = action.payload
        },
        setRideId: (state , action)=>{
            state.rideId = action.payload
        },
        setAcceptedRideIndex: (state , action)=>{
            state.acceptedRideIndex = action.payload
        }
    }
})

export const { setRideAccepted , setRideId , setAcceptedRideIndex , setRideAcceptedData } = rideAcceptedSlice.actions;

const rideAcceptedReducer = rideAcceptedSlice.reducer

export default rideAcceptedReducer;