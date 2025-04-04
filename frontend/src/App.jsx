import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Account from './pages/Account'
import CaptainAccount from './pages/CaptainAccount'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import CaptainAuthWrapper from './pages/CaptainAuthWrapper'
import UserRideDetails from './pages/UserRideDetails'
import PaymentMethod from './pages/PaymentMethod'
import StripePayment from './pages/StripePayment'
import CaptainRideRequests from './pages/CaptainRideRequests'
import PickupRide from './pages/PickupRide'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />  

        <Route element={<UserProtectedWrapper />}>
          <Route path='/account' element={<Account />} />
          <Route path='/ride-details' element={<UserRideDetails />} />
          <Route path='/user/payment-method' element={<PaymentMethod />} />
          <Route path='/user/checkout/stripe' element={<StripePayment />} />
        </Route>

        <Route element={<CaptainAuthWrapper />}>
          <Route path='/captain/dashboard' element={<CaptainAccount />} />
          <Route path='/captain/ride-requests' element={<CaptainRideRequests />} />
          <Route path='/captain/pickup-in-progress' element={<PickupRide />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
