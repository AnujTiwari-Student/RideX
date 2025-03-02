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

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route element={<UserProtectedWrapper />}>
          <Route path='/captain-login' element={<CaptainLogin />} />
          <Route path='/account' element={<Account />} />
        </Route>
        <Route path='/captain-account' element={<CaptainAccount />} />
      </Routes>
    </div>
  )
}

export default App
