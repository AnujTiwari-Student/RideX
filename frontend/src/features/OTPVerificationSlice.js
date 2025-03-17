import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    otpSubmitted: false,
};

const OTPVerificationSlice = createSlice({
    name: "otpVerification",
    initialState,
    reducers: {
        otpVerified: (state, action) => {
            state.otpSubmitted = action.payload;
        },
        resetOtp: (state , action) => {
            state.otpSubmitted = false;
        }
}})

export const { otpVerified , resetOtp } = OTPVerificationSlice.actions;

export default OTPVerificationSlice.reducer;