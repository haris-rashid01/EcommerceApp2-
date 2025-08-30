import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:"https://fakestoreapi.in/api",
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;