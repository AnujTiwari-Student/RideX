import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    rideRequestsList: [],
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
    async (data, { rejectWithValue }) => {
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

const rideRequestsListSlice = createSlice({
    name: "rideRequestsList",
    initialState,
    reducers: {
        setRideRequestsList: (state, action) => {
            state.rideRequestsList = action.payload;
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
    }
})

export const { setRideRequestsList } = rideRequestsListSlice.actions;

const rideRequestsListReducer = rideRequestsListSlice.reducer;
export default rideRequestsListReducer