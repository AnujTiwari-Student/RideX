import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    pickup: '',
    destination: '',
    locationSuggestion: '',
    loading: false,
    error: null,
    serverResponse: null,
}

export const locationSuggestion = createAsyncThunk(
    'user/locationSuggestion',
    async (input, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No authentication token found!");
                return rejectWithValue({ message: "No authentication token" });
            }
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/location-suggestion`, {
                params: { input },
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            })
            console.log('API Response:', response.data);
            return response.data
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ message: 'An unexpected error occurred' });
            }
        }
    }
)

export const userLocationSlice = createSlice({
    name: 'userLocation',
    initialState,
    reducers: {
        setPickup: (state, action) => {
            state.pickup = action.payload.trim()
        },
        setDestination: (state, action) => {
            state.destination = action.payload.trim()
        },
        setServerResponse: (state, action) => {
            state.serverResponse = action.payload
        },
        clearLocationSuggestion: (state) => {
            state.locationSuggestion = []; 
        }
    },
    extraReducers: (builder) => {
        builder.addCase(locationSuggestion.pending, (state) => {
            state.loading = true
            state.error = null
        }).addCase(locationSuggestion.fulfilled, (state, action) => {
            state.loading = false
            state.locationSuggestion = action.payload
            state.error = null
        }).addCase(locationSuggestion.rejected, (state , action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const { setPickup, setDestination, setServerResponse , clearLocationSuggestion } = userLocationSlice.actions

const userLocationReducer = userLocationSlice.reducer
export default userLocationReducer