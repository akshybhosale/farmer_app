// src/Components/Auth/PrivateRoute.tsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { getToken } from '../../utils/token'

interface PrivateRouteProps {
  element: React.ReactElement
  allowedRoles?: string[] // optional role check
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  allowedRoles
}) => {
  const token = getToken()
  const role = localStorage.getItem('role') // assuming you stored role after login

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(role || '')) {
    return <Navigate to="/not-authorized" replace />
  }

  return element
}

export default PrivateRoute
