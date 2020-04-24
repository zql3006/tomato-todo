import axios from 'axios'
import history from './history'

const appID = "N3y3yFNjWuHk6NRX3N1CYmBc"
const appSecret = "EuoKSFs7eNmxKDjmpuqGymWp"

const instance = axios.create({
    baseURL: 'https://gp-server.hunger-valley.com/',
    headers: {
        't-app-id': appID,
        't-app-secret': appSecret
    }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    const xToken = localStorage.getItem('x-token')
    if(xToken){
        config.headers['Authorization'] = `Bearer ${xToken}`
    }
    return config;
}, function (error) {
    console.error(error)
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    if(response.headers['x-token']){
        localStorage.setItem('x-token',response.headers['x-token'])
    }
    return response;
}, function (error) {
    // Do something with response error
    if(error.response?.status===401){
      history.push('/login')
    }
    return Promise.reject(error);
});

export default instance