import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null, 
    error: null,
    loading: false,
    isAuthenticated: !!localStorage.getItem('token'),
}

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userData, {rejectWithValue}) => {
        // console.log('Thunk called')
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
            // console.log("Request Successful: ", res.data);
            const token = res.data.token
            localStorage.setItem('token', token)
            return res.data 
        } catch (error) {
            console.error("Request Failed: ", error.response?.data || error.message);
           return rejectWithValue(error.response.data); 
        }
    }
)

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async (_, {rejectWithValue}) => {
        try {
            const token =localStorage.getItem('token')
            if (!token) {
                throw new Error("No token found");
              }
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
            state.loading = true;
            state.error = null
            state.user = null
            state.isAuthenticated = false
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
            state.isAuthenticated = false
        });
        builder.addCase(loginUser.pending, (state) => {
            console.log(`Pending Triggered! Current loading state: ${state.loading}`);
            state.loading = true;
            state.error = null;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            console.log(`Fulfilled Triggered! Current loading state: ${state.loading}`);
            state.loading = false;
            state.user = action.payload;
            state.error = null;
            state.isAuthenticated = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.user = null
            state.isAuthenticated = false
        });
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true; 
            state.error = null; 
            state.user = null;
            state.isAuthenticated = true;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            localStorage.removeItem('token'); 
            state.loading = false; 
            state.user = null; 
            state.isAuthenticated = false; 
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false; 
            state.error = action.payload;
            state.user = null;
        });
    }
    
})


const userReducer = userSlice.reducer
export default userReducer