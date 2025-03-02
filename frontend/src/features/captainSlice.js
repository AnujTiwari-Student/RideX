import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fullname: {
        firstname: '',
        lastname: ''
    },
    email: '',
    password: '',
    status: '',
    vehicle: {
        color: '',
        plate: '',
        capacity: 1,
        vehicleType: ''
    },
    location: {
        lat: null,
        lng: null,
    },
    serverResponse: null,
}

export const captainSlice = createSlice({
    name: 'captain',
    initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.fullname.firstname = action.payload
        },
        setLastName: (state, action) => {
            state.fullname.lastname = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setColor: (state, action) => {
            state.vehicle.color = action.payload;
        },
        setPlate: (state, action) => {
            state.vehicle.plate = action.payload;
        },
        setCapacity: (state, action) => {
            state.vehicle.capacity = action.payload;
        },
        setVehicleType: (state, action) => {
            state.vehicle.vehicleType = action.payload;
        },
        setLat: (state, action) => {
            state.location.lat = action.payload;
        },
        setLng: (state, action) => {
            state.location.lng = action.payload;
        },
        setServerResponse: (state, action) => {
            state.serverResponse = action.payload;
        },
    },
});

export const {setFirstName , setLastName , setEmail, setPassword, setStatus, setVehicle, setLocation, setServerResponse} = captainSlice.actions;

export default captainSlice.reducer;