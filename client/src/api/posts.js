import axios from 'axios';
import { url } from './index.js';

const API = axios.create({ baseURL: url });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('auth')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`;
    }
    return req;
});

export const getPosts = () => API.get('/p');

export const createPost = (post) => {
    return API({
        method: 'post',
        url: '/p',
        headers: {
            'Content-Type': 'application/json'
        },
        data: post
    });
}

export const updatePost = (postID, updates) => {
    return API({
        method: 'patch',
        url: '/p/' + postID,
        headers: {
            'Content-Type': 'application/json'
        },
        data: updates
    })
}

export const supportPost = (postID) => API.patch('/p/' + postID + "/support");
export const archivePost = (postID) => API.delete('/p/' + postID);

