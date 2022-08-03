export default (posts=[], action) => {
    switch (action.type) {
        case 'p/GET':
            return action.payload.posts;
        case 'p/CREATE':
            return [...posts, action.payload];
        case 'p/UPDATE':
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case 'p/ARCHIVE':
            return posts.filter((post) => post._id !== action.payload._id);
        default:
            return posts;
    }
};