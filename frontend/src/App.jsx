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
import UserLogout from './pages/UserLogout'
import CaptainAuthWrapper from './pages/CaptainAuthWrapper'
import CaptainLogout from './pages/CaptainLogout'

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
          <Route path='/user/logout' element={<UserLogout />} />
        </Route>
        <Route element={<CaptainAuthWrapper />}>
          <Route path='/captain-account' element={<CaptainAccount />} />
          <Route path='/captain/logout' element={<CaptainLogout />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
