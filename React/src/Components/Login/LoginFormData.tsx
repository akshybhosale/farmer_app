import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { loginUser } from '../../Services/auth'
import { setToken, getToken } from '../../utils/token'

type FormData = {
  email: string
  password: string
}

const Login: React.FC = () => {
  const [role, setRole] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const token = getToken()
  const storedRole = localStorage.getItem('role')

  // ✅ If already logged in → redirect to their dashboard
  if (token && storedRole) {
    return <Navigate to={`/${storedRole}`} replace />
  }

  // ✅ Prefill role if passed from Header
  useEffect(() => {
    if (location.state?.role) {
      setRole(location.state.role)
    }
  }, [location.state])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      if (!role) {
        alert('Please select a role before logging in.')
        return
      }

      const res = await loginUser({ ...data, role })

      // ✅ Store JWT token + role
      setToken(res.data.token)
      localStorage.setItem('role', role)

      alert(`Login successful as ${role}!`)
      navigate(`/${role}`)
    } catch (err: any) {
      console.error('Login failed', err)
      const errorMessage = err.response?.data?.message || ''
      alert(`Login failed! ${errorMessage}`)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md space-y-10">
        {/* Role Selector */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Select Your Role
          </h1>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select Role --</option>
            <option value="Admin">Admin</option>
            <option value="Farmer">Farmer</option>
            <option value="Customer">Customer</option>
          </select>
        </div>

        {/* Login Form */}
        {role && (
          <div className="bg-white py-8 px-6 shadow rounded-lg">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
              Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', { required: true })}
                  placeholder="Email address"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">Email is required</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register('password', { required: true })}
                  placeholder="Password"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    Password is required
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Sign in
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Not a member?{' '}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register here
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
