import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

export const registerUser = (data: any) => {
  console.log('Register', data)
  axios.post(`${API_URL}/register`, data)
}
export const loginUser = (data: any) => {
  console.log('Login', data)
  return axios.post(`${API_URL}/login`, data)
}

export const checkAuth = (token: string) =>
  axios.get(`${API_URL}/check-auth`, {
    headers: { Authorization: `Bearer ${token}` }
  })
