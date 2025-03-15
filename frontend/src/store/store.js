import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // Uses localStorage for web
import userReducer from '../features/userSlice'
import captainReducer from '../features/captainSlice'
import captainAuthReducer from '../features/captainAuthSlice'
import userLocationReducer from '../features/userLocationSlice'
import selectedVehicleReducer from '../features/selectedVehicleSlice'
import paymentReducer from '../features/paymentSlice'
import rideRequestReducer from '../features/rideRequestSlice'
import rideRequestsListReducer from '../features/rideRequestsListSlice'
import rideAcceptedReducer from '../features/rideAcceptedSlice'
import { combineReducers } from 'redux'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'captain', 'captainAuth' , 'rideAccepted'], 
}

const rootReducer = combineReducers({
  user: userReducer,
  captain: captainReducer,
  captainAuth: captainAuthReducer,
  userLocation: userLocationReducer,
  selectedVehicle: selectedVehicleReducer,
  payment: paymentReducer,
  rideRequest: rideRequestReducer,
  rideRequestsList: rideRequestsListReducer,
  rideAccepted: rideAcceptedReducer,
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
