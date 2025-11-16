import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { Header } from './Components/Header/Header'
// import Login from './Components/Login/Login'
import Admin from './Components/Pages/Admin'
import Customer from './Components/Pages/Customer'
import Farmer from './Components/Pages/Farmer'
import NotAuthorized from './Components/Pages/NotAuthorized'
import PrivateRoute from './Components/Auth/PrivateRoute'
import { Header } from './Components/Header/Header '
import Login from './Components/Login/LoginFormData'
import Registration from './Components/Registration/Registration'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute element={<Admin />} allowedRoles={['admin']} />
          }
        />
        <Route
          path="/customer"
          element={
            <PrivateRoute element={<Customer />} allowedRoles={['customer']} />
          }
        />
        <Route
          path="/farmer"
          element={
            <PrivateRoute element={<Farmer />} allowedRoles={['farmer']} />
          }
        />

        <Route path="/not-authorized" element={<NotAuthorized />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
