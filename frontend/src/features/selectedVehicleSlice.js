import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedVehicle: null,
    selectedVehicleFare: null
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
    }
})

export const {setSelectedVehicle , setSelectedVehicleFare} = selectedVehicleSlice.actions;

export default selectedVehicleSlice.reducer;