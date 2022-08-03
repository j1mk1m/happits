import * as api from '../api/user';

export const getUserProfile = (userID) => async (dispatch) => {
    try {
        const { data } = await api.getUserProfile(userID);
        dispatch({type: 'profile/GET', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserInfo = () => async (dispatch) => {
    try {
        const {data} = await api.getUserInfo();
        dispatch({type: 'user/GET', payload: data.user});
    } catch (error) {
        console.log(error.message);
    }
}

export const requestPartner = (userID) => async (dispatch) => {
    try {
        const {data} = await api.requestPartner(userID);
        dispatch({type: 'explore/REQUEST/users', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}
export const removePartner = (userID) => async (dispatch) => {
    try {
        const {data} = await api.removePartner(userID);
        dispatch({type: 'user/GET', payload: data.user});
    } catch (error) {
        console.log(error.message);
    }
}

export const acceptRequest = (userID) => async (dispatch) => {
    try {
        const {data} = await api.acceptRequest(userID);
        dispatch({type: 'user/GET', payload: data.user});
    } catch (error) {
        console.log(error.message);
    }
}

export const rejectRequest = (userID) => async (dispatch) => {
    try {
        const {data} = await api.rejectRequest(userID);
        dispatch({type: 'user/GET', payload: data.user});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUser = (userID, updates) => async (dispatch) => {
    try {
        const {data} = await api.updateUser(userID, updates);
        dispatch({type: 'user/USERINFO', payload: data.user});
    } catch (error) {
        console.log(error.message);
    }
}
