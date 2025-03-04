import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import captainReducer from '../features/captainSlice'
import authReducer from '../features/authSlice'
import captainAuthReducer from '../features/captainAuthSlice'
import userLocationReducer from '../features/userLocationSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    captain: captainReducer,
    auth: authReducer,
    captainAuth: captainAuthReducer,
    userLocation: userLocationReducer,
  }
})

export default store
