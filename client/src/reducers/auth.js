export default (state = {authData: null}, action) => {
    switch (action.type) {
        case 'auth/LOGIN':
            localStorage.setItem('auth', JSON.stringify({...action?.payload}));
            return {...state, authData: action?.payload};
        case 'auth/LOGOUT':
            localStorage.clear();
            return {...state, authData: null};
        case 'auth/ERROR':
            return {...state, errorMessage: action.payload};
        default:
            return state;
    }
}