import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8000', // Replace with your actual API endpoint
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${localStorage.getItem('authToken')}` // Read the token from localStorage before each request
  }
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Modify the request config here (if needed)
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = `Token ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Modify the response data here (if needed)
    return response;
  },
  (error) => {
    // Handle unauthorized errors (status code 401)
    if (error.response && error.response.status === 401) {
      // Perform actions for unauthorized requests
      localStorage.setItem('authToken', null);
      window.location = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
