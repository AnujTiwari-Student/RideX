import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedVehicle: null,
    selectedVehicleFare: null,
    selectedVehiclePanel: false,
}

export const selectedVehicleSlice = createSlice({
    name: "selectedVehicle",
    initialState,
    reducers: {
        setSelectedVehicle: (state, action) => {
            state.selectedVehicle = action.payload
        },
        setSelectedVehicleFare: (state, action) => {
            state.selectedVehicleFare = action.payload
        },
        setSelectedVehiclePanel: (state, action) => {
            state.selectedVehicleMenuOpen = action.payload
        },
    }
})

export const { setSelectedVehicle , setSelectedVehicleFare , setSelectedVehiclePanel } = selectedVehicleSlice.actions;

export default selectedVehicleSlice.reducer;