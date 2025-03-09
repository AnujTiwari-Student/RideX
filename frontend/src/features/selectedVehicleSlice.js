import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedVehicle: null
}

export const selectedVehicleSlice = createSlice({
    name: "selectedVehicle",
    initialState,
    reducers: {
        setSelectedVehicle: (state , action)=>{
            state.selectedVehicle = action.payload
        }
    }
})

export const {setSelectedVehicle} = selectedVehicleSlice.actions;

export default selectedVehicleSlice.reducer;