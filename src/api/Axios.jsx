// src/api/axios.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://turfai.openturf.dev/stageone_v2_be/api/v1', 
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2UzY2Q5YmU2MjFkYzAwNmZiNzQ2OWMiLCJpYXQiOjE3NDI5ODI1NTUsImV4cCI6MTc3NDUxODU1NSwidHlwZSI6ImFjY2VzcyJ9.vuQmOqt4U7JAGAtpQDRQXA-BuZFfKVX2_OIPRXV_Vd4`,
    'Content-Type': 'application/json',
  },
  timeout: 1000,
});



// Add a request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     // const token = localStorage.getItem('access_token'); 
//     //harcoded for now, will change later
//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2UzOTYxOGU2MjFkYzAwNmZiNzQ2NGQiLCJpYXQiOjE3NDI5NjgzNDQsImV4cCI6MTc3NDUwNDM0NCwidHlwZSI6ImFjY2VzcyJ9.-6vq68fIMZ-gSPtKeuh6gbQijh1A60rFjOwTuYMqV4w"
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Handle responses

apiClient.interceptors.request.use((config) => {
    return config;
  }, (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  });


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // redirect to wherever
    }
    return Promise.reject(error);
  }
);

export default apiClient;
