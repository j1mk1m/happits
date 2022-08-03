import axios from 'axios';
import { url } from './index.js';

const API = axios.create({ baseURL: url });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('auth')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`;
    }
    return req;
});

export const getHabits = () => API.get('/h');

export const createHabit = (habit) => {
    return API({
        method: 'post',
        url: '/h',
        headers: {
            'Content-Type': 'application/json'
        },
        data: habit
    });
}

export const updateHabit = (habitID, updates) => {
    return API({
        method: 'patch',
        url: '/h/' + habitID,
        headers: {
            'Content-Type': 'application/json'
        },
        data: updates
    })
}

export const supportHabit = (habitID) => API.patch('/h/' + habitID + "/support");
export const archiveHabit = (habitID) => API.delete('/h/' + habitID);

