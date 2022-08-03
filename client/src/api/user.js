import axios from 'axios';
import { url } from './index.js';

const API = axios.create({ baseURL: url });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('auth')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`;
    }
    return req;
});

export const getUserProfile = (userID) => API.get('/user/' + userID);

export const getUserInfo = () => API.get('/user');

export const updateUser = (userID, updates) => {
    return API({
        method: 'patch',
        url: '/user/' + userID,
        headers: {
            'Content-Type': 'application/json'
        },
        data: updates
    });
}

export const requestPartner = (userID) => API.patch('/user/request/' + userID);
export const removePartner = (userID) => API.patch('/user/remove/' + userID);
export const acceptRequest = (userID) => API.patch('/user/accept/' + userID);
export const rejectRequest = (userID) => API.patch('/user/reject/' + userID);
