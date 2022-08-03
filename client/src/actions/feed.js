import * as api from '../api/feed';

export const getFeed = () => async (dispatch) => {
    try {
        const {data} = await api.getFeed();
        dispatch({type: 'feed/GET', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}