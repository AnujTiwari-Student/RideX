import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import captainReducer from '../features/captainSlice'
import authReducer from '../features/authSlice'
import captainAuthReducer from '../features/captainAuthSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    captain: captainReducer,
    auth: authReducer,
    captainAuth: captainAuthReducer,
  }
})

export default store
