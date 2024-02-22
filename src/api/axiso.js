import axios from 'axios';

const BASE_URL = '/api';

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export const axiosFile = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
});
