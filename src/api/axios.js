import axios from 'axios';

// const BASE_URL = 'http://localhost:8000/';
const BASE_URL = 'https://fca-server-produce-production.up.railway.app';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPublic = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});