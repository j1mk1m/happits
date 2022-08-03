import * as api from '../api/logs';

export const getLogs = () => async (dispatch) => {
    try {
        const {data} = await api.getLogs();
        dispatch({type: 'log/GET', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createLog = (log) => async (dispatch) => {
    try {
        const { data } = await api.createLog(log);
        dispatch({type: 'log/CREATE', payload: data.log});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateLog = (logID, updates) => async (dispatch) => {
    try {
        const { data } = await api.updateLog(logID, updates);
        dispatch({ type: 'log/UPDATE', payload: data.log});
    } catch (error) {
        console.log(error.message);
    }
}

export const archiveLog = (logID) => async (dispatch) => {
    try {
        const { data } = await api.archiveLog(logID);
        dispatch({ type: 'log/ARCHIVE', payload: data.log});
    } catch (error) {
        console.log(error.message);
    }
}
