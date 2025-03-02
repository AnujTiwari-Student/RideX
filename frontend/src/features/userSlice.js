import {createSlice , nanoid} from '@reduxjs/toolkit';

const initialState = {
    fullname: {
        firstName: '',
        lastName: ''
    },
    email: '',
    password: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.fullname.firstName = action.payload
        },
        setLastName: (state, action) => {
            state.fullname.lastName = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
    }
})

export const {setFirstName, setLastName, setEmail, setPassword} = userSlice.actions;

export default userSlice.reducer