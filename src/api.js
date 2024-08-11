import axios from 'axios';
import { mockData } from './mockData';

const baseURL = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:8000';
const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Token ${localStorage.getItem('authToken')}` // Read the token from localStorage before each request
  }
});

const nonAuthenticatedApi = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export { nonAuthenticatedApi };

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Modify the request config here (if needed)
    const authToken = localStorage.getItem('authToken');
    const isDemoUser = localStorage.getItem('username') === 'demo';
    if (isDemoUser) {
      // raise error for any request other than GET
      if (config.method !== 'get') {
        // return error that can be parsed by extractErrorMessageFromResponse
        return Promise.reject({
          response: {
            status: 400,
            data: {
              detail: 'Demo users cannot perform this action'
            }
          }
        });
      }
      // get mock data for demo user
      const mockDataForEndpoint = mockData.find(entry => entry.pattern.test(config.url));
      // console.log('mock data for endpoint ', config.url, mockDataForEndpoint);
      if (!mockDataForEndpoint) {
        return Promise.reject({
          response: {
            status: 400,
            data: {
              detail: 'Mock data not found for this action'
            }
          }
        });
      }
      config.adapter = function (config) {
        return new Promise(function (resolve, reject) {
          resolve({
            data: mockDataForEndpoint.response
          });
        });
      }
    } else if (authToken) {
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
