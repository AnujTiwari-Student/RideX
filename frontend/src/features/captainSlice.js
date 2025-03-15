import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    captain: null,
    loading: true,
    error: null,
    isAuthenticated: false,
}

export const captainLogin = createAsyncThunk (
    'captain/captainLogin',
    async (captainData , {rejectWithValue}) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login` , captainData)
            const token = res.data.token;
            localStorage.setItem('captainToken', token);
            return res.data;
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
})

export const createCaptain = createAsyncThunk (
    'captain/createCaptain',
    async (captainData , {rejectWithValue}) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register` , captainData)
            const token = res.data.token;
            localStorage.setItem('captainToken', token);
            return res.data;
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
})

export const captainSlice = createSlice({
    name: 'captain',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(captainLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.captain = null;
        });
        builder.addCase(captainLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.captain = action.payload;
            state.error = null;
            state.isAuthenticated = true;
        });
        builder.addCase(captainLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.captain = null;
        });
        builder.addCase(createCaptain.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.captain = null;
        });
        builder.addCase(createCaptain.fulfilled, (state, action) => {
            state.loading = false;
            state.captain = action.payload;
            state.error = null;
            state.isAuthenticated = true;
        });
        builder.addCase(createCaptain.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.captain = null;
        })
    }
});

const captainReducer = captainSlice.reducer
export default captainReducer;;