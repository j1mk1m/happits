import axios from 'axios';
import { url } from './index.js';

const API = axios.create({ baseURL: url });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('auth')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`;
    }
    return req;
});

export const getLogs = () => API.get('/log');

export const createLog = (log) => {
    return API({
        method: 'post',
        url: '/log',
        headers: {
            'Content-Type': 'application/json'
        },
        data: log
    });
}
export const updateLog = (logID, updates) => {
    return API({
        method: 'patch',
        url: '/log/' + logID,
        headers: {
            'Content-Type': 'application/json'
        },
        data: updates
    })
}

export const archiveLog = (logID) => API.delete('/log/' + logID);
