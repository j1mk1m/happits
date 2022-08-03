import axios from 'axios';

export const url = 'https://happits.herokuapp.com';

const API = axios.create({ baseURL: url });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('auth')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`;
    }
    return req;
});


export const getPost = (postID) => API.get('/p/' + postID);
export const getHabit = (habitID) => API.get('/p/' + habitID);


