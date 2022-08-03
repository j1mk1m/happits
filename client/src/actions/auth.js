import * as api from '../api/auth';

export const login = (user) => async (dispatch) => {
    try {
        const {data} = await api.login(user);
        dispatch({type: 'auth/LOGIN', payload: data});
    } catch (error) {
        console.log(error.message);
        const errorMessage = error.response.data.message || "Login unsuccessful";
        console.log(errorMessage);
        dispatch({type: 'auth/ERROR', payload: errorMessage});
    }
}

export const register = (user) => async (dispatch) => {
    try {
        const {data} = await api.register(user);
        dispatch({type: 'auth/LOGIN', payload: data});
    } catch (error) {
        console.log(error.message);
        const errorMessage = error.response.data.message || "Signup unsuccessful";
        console.log(errorMessage);
        dispatch({type: 'auth/ERROR', payload: errorMessage});
    }
}

export const resetPassword = (auth) => async (dispatch) => {
    try {
        const {data} = await api.resetPassword(auth);
        dispatch({ type: 'auth/LOGIN', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}
