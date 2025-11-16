import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../Services/auth'
import { setToken } from '../../utils/token'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
}

const RoleSelection: React.FC = () => {
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginUser(data)
      setToken(res.data.token)
      alert('Login successful!')
      window.location.reload()
    } catch (err) {
      console.error(err)
      alert('Login failed!')
    }
  }

  const handleContinue = () => {
    if (!role) return alert('Please select a role')

    // Navigate based on role
    if (role === 'admin') navigate('/admin-login')
    if (role === 'farmer') navigate('/farmer-login')
    if (role === 'customer') navigate('/customer-login')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-xl w-96 text-center">
        <h1 className="text-2xl font-semibold mb-4">Select Your Role</h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none mb-4"
        >
          <option value="">-- Select Role --</option>
          <option value="admin">Admin</option>
          <option value="farmer">Farmer</option>
          <option value="customer">Customer</option>
        </select>

        {role && (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                  Sign in to your account
                </h2>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-8 space-y-6"
                >
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...register('email', { required: true })}
                        placeholder="Email address"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          Email is required
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        {...register('password', { required: true })}
                        placeholder="Password"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          Password is required
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <Link
                        to="/forgot-password"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                    <p className="mt-2 text-center text-sm text-gray-600">
                      Not a member?{' '}
                      <Link
                        to="/register"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Register here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RoleSelection
