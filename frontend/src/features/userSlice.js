import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null, 
    error: null,
    loading: true,
    isAuthenticated: false
}

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userData, {rejectWithValue}) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
            const token = res.data.token
            localStorage.setItem('token', token)
            return res.data 
        } catch (error) {
           return rejectWithValue(error.response.data); 
        }
    }
)

export const createUser = createAsyncThunk(
    'user/createUser',
    async (userData, {rejectWithValue}) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, userData)
            const token = res.data.token
            localStorage.setItem('token', token)
            return res.data
        } catch (error) {
           return rejectWithValue(error.response.data); 
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.loading = true
            state.error = null
            state.user = null
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = null;
            state.isAuthenticated = true
        })
        .addCase(createUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.user = null
        });
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
            state.error = null
            state.user = null
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = null;
            state.isAuthenticated = true
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.user = null
        })
    }
    
})


const userReducer = userSlice.reducer
export default userReducer