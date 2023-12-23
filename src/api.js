import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:8000', // Replace with your actual API endpoint
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${localStorage.getItem('authToken')}` // Read the token from localStorage before each request
  }
})

export default api
