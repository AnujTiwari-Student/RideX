import {createSlice , nanoid} from '@reduxjs/toolkit';

const initialState = {
    fullname: {
        firstname: '',
        lastname: ''
    },
    email: '',
    password: '',
    serverResponse: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.fullname.firstname = action.payload
        },
        setLastName: (state, action) => {
            state.fullname.lastname = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setServerResponse: (state, action) => {
            state.serverResponse = action.payload; 
        },
    }
})

export const {setFirstName, setLastName, setEmail, setPassword , setServerResponse} = userSlice.actions;

export default userSlice.reducer