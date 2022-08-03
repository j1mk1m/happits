import axios from 'axios';
import { url } from './index.js';

const API = axios.create({ baseURL: url });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('auth')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`;
    }
    return req;
});

export const register = (user) => {
    const res = axios({
        method: 'post',
        url: url + '/auth/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: user
    });
    return res;
}

export const login = (user) => {
    const res = axios({
        method: 'post',
        url: url + '/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: user
    });

    return res;
}

export const resetPassword = (auth) => {
    return API({
        method: 'post',
        url: '/auth/reset',
        headers: {
            'Content-Type': 'application/json'
        },
        data: auth
    })
}
