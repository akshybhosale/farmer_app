import React from 'react'
import { useForm } from 'react-hook-form'
import { registerUser } from '../../Services/auth'
import { Link } from 'react-router-dom'

type Props = {
  onRegistered?: () => void
}

type FormData = {
  role: string
  fname: string
  lname: string
  email: string
  password: string
  mobile: string
  place: string
}

const Registration: React.FC<Props> = ({ onRegistered }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data)
      alert('Registration successful!')
      onRegistered?.()
    } catch (err) {
      console.error(err)
      alert('Registration failed!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mt-20">
            Create Your Account
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            Select your role and fill in your details to register.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              {...register('role', { required: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">-- Select Role --</option>
              {/* <option value="Admin">Admin</option> */}
              <option value="Farmer">Farmer</option>
              <option value="Customer">Customer</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">Role is required</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="fname"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="fname"
                {...register('fname', { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="First Name"
              />
              {errors.fname && (
                <p className="text-red-500 text-sm mt-1">
                  First name is required
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lname"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lname"
                {...register('lname', { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Last Name"
              />
              {errors.lname && (
                <p className="text-red-500 text-sm mt-1">
                  Last name is required
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
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
              {...register('password', { required: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mobile */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile
              </label>
              <input
                id="mobile"
                {...register('mobile', { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Mobile"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">Mobile is required</p>
              )}
            </div>

            {/* Place */}
            <div>
              <label
                htmlFor="place"
                className="block text-sm font-medium text-gray-700"
              >
                Place
              </label>
              <input
                id="place"
                {...register('place', { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Place"
              />
              {errors.place && (
                <p className="text-red-500 text-sm mt-1">Place is required</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-white font-semibold shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Registration
