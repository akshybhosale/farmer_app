import React, { useEffect, useState } from 'react'
import Registration from '../Registration/Registration'
import Login from '../Login/LoginFormData'
import { getToken, isTokenValid } from '../../utils/token'

const AuthWrapper: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasRegistered, setHasRegistered] = useState(false)

  useEffect(() => {
    const token = getToken()
    if (token && isTokenValid()) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setHasRegistered(false)
  }

  if (isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center mt-32">
        <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
        <p className="text-gray-700 mb-6">You are already logged in.</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all"
        >
          Logout
        </button>
      </div>
    )
  }

  return !hasRegistered ? (
    <Registration onRegistered={() => setHasRegistered(true)} />
  ) : (
    <Login />
  )
}

export default AuthWrapper
