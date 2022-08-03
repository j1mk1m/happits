import * as api from '../api/posts';

export const getPosts = () => async (dispatch) => {
    try {
        const {data} = await api.getPosts();
        dispatch({type: 'p/GET', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: 'p/CREATE', payload: data.post});
    } catch (error) {
        console.log(error.message);        
    }
}

export const updatePost = (postID, updates) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(postID, updates);
        dispatch({ type: 'p/UPDATE', payload: data.post});
    } catch (error) {
        console.log(error.message);
    }
}

export const supportPost = (postID) => async (dispatch) => {
    try {
        const { data } = await api.supportPost(postID);
        dispatch({ type: 'feed/UPDATE', payload: data.post });
        dispatch({ type: 'explore/UPDATE', payload: data.post });
        dispatch({ type: 'profile/UPDATE', payload: data.post });
    } catch (error) {
        console.log(error.message);
    }
}

export const archivePost = (postID) => async (dispatch) => {
    try {
        const { data } = await api.archivePost(postID);
        dispatch({type: "p/ARCHIVE", payload: data.post});
    } catch (error) {
        console.log(error.message);
    }
}