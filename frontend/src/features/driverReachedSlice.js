import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    driverReached: false,
};

const driverReachedSlice = createSlice({
    name: "driverReached",
    initialState,
    reducers: {
        setDriverReached: (state, action) => {
            state.driverReached = action.payload;
        }
}})

export const { setDriverReached } = driverReachedSlice.actions;

export default driverReachedSlice.reducer;