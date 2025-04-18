import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // Uses localStorage for web
import userReducer from '../features/userSlice'
import captainReducer from '../features/captainSlice'
import userLocationReducer from '../features/userLocationSlice'
import selectedVehicleReducer from '../features/selectedVehicleSlice'
import paymentReducer from '../features/paymentSlice'
import rideRequestReducer from '../features/rideRequestSlice'
import rideRequestsListReducer from '../features/rideRequestsListSlice'
import rideAcceptedReducer from '../features/rideAcceptedSlice'
import { combineReducers } from 'redux'
import otpVerificationReducer from '../features/OTPVerificationSlice'
import driverReachedReducer from '../features/driverReachedSlice'
import socketReducer from '../features/socketSlice'; 
import locationTrackingReducer from '../features/trackingLocationSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'captain' , 'otpVerification' , 'driverReached' , 'selectedVehicle' , 'payment', 'rideRequestsList'], 
}

const rootReducer = combineReducers({
  user: userReducer,
  captain: captainReducer,
  userLocation: userLocationReducer,
  selectedVehicle: selectedVehicleReducer,
  payment: paymentReducer,
  rideRequest: rideRequestReducer,
  rideRequestsList: rideRequestsListReducer,
  rideAccepted: rideAcceptedReducer,
  otpVerification: otpVerificationReducer,
  driverReached: driverReachedReducer,
  socket: socketReducer, 
  locationTracking: locationTrackingReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

const persistor = persistStore(store)

export { store, persistor }
