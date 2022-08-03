export default (profile = {user: {}, posts: [], habits: []}, action) => {
    switch (action.type) {
        case 'profile/GET':
            return action.payload;
        case 'profile/UPDATE':
            return {
                ...profile,
                habits: profile.habits.map((item) => (item._id === action.payload._id ? action.payload : item)),
                posts: profile.posts.map((item) => (item._id === action.payload._id ? action.payload : item))
            }
        default:
            return profile;
    }
};