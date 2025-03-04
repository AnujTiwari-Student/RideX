import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("captainToken");

const initialState = {
    isAuthenticated: !!storedToken, 
    token: storedToken ||null, 
}

export const captainAuthSlice = createSlice({
    name: "captainAuth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token; 
            localStorage.setItem("captainToken", action.payload.token);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem("captainToken");
        },
    },
});

export const { loginSuccess, logout } = captainAuthSlice.actions;

export default captainAuthSlice.reducer;