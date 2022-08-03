import * as api from '../api/explore';

export const getAllUsers = () => async (dispatch) => {
    try {
        const {data} = await api.getAllUsers();
        dispatch({type: 'explore/GET/users', payload: data.users});
    } catch (error) {
        console.log(error.message);
    }
}

export const getExplore = () => async (dispatch) => {
    try {
        const { data } = await api.getExplore();
        dispatch({type: 'explore/GET/feed', payload: data});
    } catch (error) {
        
    }
}