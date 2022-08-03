import * as api from '../api/habits';

export const getHabits = () => async (dispatch) => {
    try {
        const {data} = await api.getHabits();
        dispatch({type: 'h/GET', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createHabit = (habit) => async (dispatch) => {
    try {
        const { data } = await api.createHabit(habit);
        dispatch({ type: 'h/CREATE', payload: data.habit});
    } catch (error) {
        console.log(error.message);        
    }
}

export const updateHabit = (habitID, updates) => async (dispatch) => {
    try {
        const { data } = await api.updateHabit(habitID, updates);
        dispatch({ type: 'h/UPDATE', payload: data.habit});
    } catch (error) {
        console.log(error.message);
    }
}

export const supportHabit = (habitID) => async (dispatch) => {
    try {
        const { data } = await api.supportHabit(habitID);
        dispatch({ type: 'feed/UPDATE', payload: data.habit });
        dispatch({ type: 'explore/UPDATE', payload: data.habit });
        dispatch({ type: 'profile/UPDATE', payload: data.habit });
    } catch (error) {
        console.log(error.message);
    }
}

export const archiveHabit = (habitID) => async (dispatch) => {
    try {
        const { data } = await api.archiveHabit(habitID);
        dispatch({type: "h/ARCHIVE", payload: data.habit});
    } catch (error) {
        console.log(error.message);
    }
}