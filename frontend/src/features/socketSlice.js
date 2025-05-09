import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

const initialState = {
    socket: null,
    connected: false,
    messages: [],
    lastLocation: null,
};

export const createConnection = createAsyncThunk(
    'socket/createConnection',
    async (url, { dispatch }) => {

        const socket = io(url, {
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            dispatch(setConnected(true));
            dispatch(setSocket(socket));
            console.log('Connected to server with socket ID:', socket.id);
        });

        socket.on('disconnect', () => {
            dispatch(setConnected(false));
            dispatch(setSocket(null));
            console.log('Disconnected from server');
        });

        socket.on('message', (message) => {
            dispatch(receiveMessage(message));
            console.log('Message received:', message);
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        dispatch(setSocket(socket));

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('message');
            socket.off('error');
            socket.disconnect();
        };
    }
);

export const updateLocation = () => async (dispatch, getState) => {
    const { socket } = getState().socket;
    const { captain } = getState().captain;
    console.log(`User: `, captain)
    console.log(`Socket: `, socket)

    if (!socket || !captain?.captain?._id) {
        console.warn("Socket or user data not available. Skipping location update.");
        return;
    }

    if(socket && captain?.captain?._id){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("Position: ", position)
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const locationData = {
                    location:{
                        lat,
                        lng,
                    },
                    userId: captain.captain._id,
                    token: captain.token,
                }
                socket.emit('captain-location', locationData);
                dispatch(setLastLocation(locationData.location));
                console.log("Location Data: ", locationData)
            });
        }
    }
}

export const sendMessage = (eventName, message) => (dispatch , getState) => {
    const { socket , connected } = getState().socket;
    if (!socket || !connected) {
        console.warn("Socket not connected. Unable to send message.");
        return;
    }
    if (socket) {
        console.log(`Sending message: ${eventName}`, message);
        socket.emit(eventName, message);
    }
};
  

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
        receiveMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setLastLocation: (state, action) => {
            state.lastLocation = action.payload;
        },
    },
});

export const { setSocket, setConnected, receiveMessage , setLastLocation } = socketSlice.actions;

export default socketSlice.reducer;