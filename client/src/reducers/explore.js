export default (explore = {users: [], habits: [], logs: [], posts: []}, action) => {
    switch (action.type) {
        case 'explore/GET/users':
            return {...explore, users: action.payload};
        case 'explore/REQUEST/users':
            return {...explore, users: explore.users.filter((user) => user._id != action.payload.user._id)}
        case 'explore/GET/feed':
            return {...explore, habits: action.payload.habits, logs: action.payload.logs, posts: action.payload.posts};
        case 'explore/UPDATE':
            return {
                ...explore,
                habits: explore.habits.map((item) => (item._id === action.payload._id ? action.payload : item)),
                logs: explore.logs.map((item) => (item._id === action.payload._id ? action.payload : item)),
                posts: explore.posts.map((item) => (item._id === action.payload._id ? action.payload : item))
            }
        default:
            return explore;
    }
}