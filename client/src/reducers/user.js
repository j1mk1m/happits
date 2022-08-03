const initState = {
    name: "",
    username: "",
    id: "",
    email: "",
    partners: [],
    requests: [],
    public: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'user/GET':
            return action.payload;
        case 'CREATE':
            return state;
        default:
            return state;
    }
};