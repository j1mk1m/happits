import axios from 'axios';
import { url } from './index.js';

const API = axios.create({ baseURL: url });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('auth')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`;
    }
    return req;
});

export const getAllUsers = () => API.get('/explore/users');

export const getExplore = () => API.get('/explore/feed');
