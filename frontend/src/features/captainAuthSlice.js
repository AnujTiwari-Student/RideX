import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false, 
    token: null, 
}

export const captainAuthSlice = createSlice({
    name: "captainAuth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token; 
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
        },
    },
});

export const { loginSuccess, logout } = captainAuthSlice.actions;

export default captainAuthSlice.reducer;