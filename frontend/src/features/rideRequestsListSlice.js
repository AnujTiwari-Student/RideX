import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    rideRequestsList: [],
    captainData: null,
    otp: null,
    rideFare: null,
    loading: false,
    error: null,
};

export const getFare = createAsyncThunk(
    'getFare/getFare',
    async (data, { rejectWithValue }) => {
        try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log("No authentication token found!");
                    return rejectWithValue({ message: "No authentication token" });
                }
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/fare`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                console.log('API Response:', response.data);
                return response.data
            }catch (error) {
                console.log('API Error:', error);
                return rejectWithValue({ message: error.message });
        }
    }
)

export const createRide = createAsyncThunk(
    'createRide/createRide',
    async (data, { dispatch, rejectWithValue }) => {
        try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log("No authentication token found!");
                    return rejectWithValue({ message: "No authentication token" });
                }
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                console.log('API Response:', response.data);
                return response.data
            }catch (error) {
                console.log('API Error:', error);
                return rejectWithValue({ message: error.message });
        }
    }
)

export const fetchAllRides = createAsyncThunk(
    'rides/fetchAllRides',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log("No authentication token found!");
                return rejectWithValue({ message: "No authentication token" });
            }
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/all-rides`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log('All Rides:', response.data);
            dispatch(setRideRequestsList(response.data));
            return response.data

        }catch (error) {
            console.log('API Error:', error);
            return rejectWithValue({ message: error.message });
        }
})

export const deleteRide = createAsyncThunk(
    'rides/deleteRide',
    async (rideId, { dispatch, rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log("No authentication token found!");
                return rejectWithValue({ message: "No authentication token" });
            }
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/ride/delete/${rideId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log('Deleteing Ride:', rideId);
            console.log('Delete API Response:', response.data);
            dispatch(fetchAllRides())
            return response.data
        }catch (error) {
            console.log('API Error:', error);
            return rejectWithValue({ message: error.message });
        }
    }
)

export const confirmRide = createAsyncThunk(
    'rides/confirmRide',
    async (rideId, { rejectWithValue }) => {

        try {
            const token = localStorage.getItem('captainToken');
            if (!token) {
                console.log("No authentication token found!");
                return rejectWithValue({ message: "No authentication token" });
            }
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/confirm`, {rideId}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log('Confirming Ride:', rideId);
            console.log('Confirm API Response:', response.data);
            return response.data
        }catch (error) {
            console.log('API Error:', error);
            return rejectWithValue({ message: error.message });
        }
    }
)

export const cancelRide = createAsyncThunk(
    'rides/cancelRide',
    async (rideId, { rejectWithValue }) => {

        try {
            const token = localStorage.getItem('captainToken');
            if (!token) {
                console.log("No authentication token found!");
                return rejectWithValue({ message: "No authentication token" });
            }
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/cancel-ride`, {rideId}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log('Canceling Ride:', rideId);
            console.log('Cancel API Response:', response.data);
            return response.data
        }catch (error) {
            console.log('API Error:', error);
            return rejectWithValue({ message: error.message });
        }
    }
)

const rideRequestsListSlice = createSlice({
    name: "rideRequestsList",
    initialState,
    reducers: {
        setRideRequestsList: (state, action) => {
            state.rideRequestsList = action.payload;
        },
        addRideRequest: (state, action) => {
            const newRide = action.payload;
            const exists = state.rideRequestsList.find(ride => ride._id === newRide._id);
            if (!exists) {
                state.rideRequestsList.push(newRide); 
            }
        }, 
        setCaptainData: (state, action) => {
            state.captainData = action.payload;
        }, 
        setOtp: (state, action) => {
            state.otp = action.payload;
        },      
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFare.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFare.fulfilled, (state, action) => {
                state.loading = false;
                state.rideFare = action.payload;
                state.error = null;
            })
            .addCase(getFare.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(createRide.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRide.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(createRide.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(cancelRide.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelRide.fulfilled, (state, action) => {
                state.loading = false;
                state.captainData = null;
                state.otp = null;
                state.rideFare = null;
                state.rideRequestsList = state.rideRequestsList.filter(ride => ride._id !== action.payload._id);
                state.error = null;
            })
            .addCase(cancelRide.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { setRideRequestsList , addRideRequest , setCaptainData , setOtp } = rideRequestsListSlice.actions;

const rideRequestsListReducer = rideRequestsListSlice.reducer;
export default rideRequestsListReducer