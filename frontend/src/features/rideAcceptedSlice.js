import { createAsyncThunk, createSlice , nanoid } from "@reduxjs/toolkit";

const initialState = {
    rideAccepted: false,
    rideId: nanoid(),
    loading: false,
    error: null,
    acceptedRideIndex: null,
};

export const rideAccepted = createAsyncThunk(
    'ride/accepted',
    async (_, { rejectWithValue }) => {
        try {
            // Simulating a delay to mimic an API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return { success: true }; // Simulated success response
        } catch (error) {
            return rejectWithValue("Ride acceptance failed");
        }
    }
)

const rideAcceptedSlice = createSlice({
    name: "rideAccepted",
    initialState,
    reducers: {
        setRideAccepted: (state , action)=>{
            state.rideAccepted = action.payload
        },
        setRideId: (state , action)=>{
            state.rideId = action.payload
        },
        setAcceptedRideIndex: (state , action)=>{
            state.acceptedRideIndex = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(rideAccepted.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(rideAccepted.fulfilled, (state, action) => {
                state.loading = false;
                state.rideAccepted = true;
                state.error = null;
            })
            .addCase(rideAccepted.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.rideAccepted = false;
            });
    },
})

export const { setRideAccepted , setRideId , setAcceptedRideIndex } = rideAcceptedSlice.actions;

const rideAcceptedReducer = rideAcceptedSlice.reducer

export default rideAcceptedReducer;