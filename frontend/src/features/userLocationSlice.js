import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pickup: '',
    destination: '',
    serverResponse: null,
}

export const userLocationSlice = createSlice({
    name: 'userLocation',
    initialState,
    reducers: {
        setPickup: (state, action) => {
            state.pickup = action.payload
        },
        setDestination: (state, action) => {
            state.destination = action.payload
        },
        setServerResponse: (state, action) => {
            state.serverResponse = action.payload
        }
    }
})

export const { setPickup, setDestination, setServerResponse } = userLocationSlice.actions

export default userLocationSlice.reducer