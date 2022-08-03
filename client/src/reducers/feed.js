export default (feed = {habits: [], logs: [], posts: []}, action) => {
    switch (action.type) {
        case 'feed/GET':
            return {habits: action.payload.habits, logs: action.payload.logs, posts: action.payload.posts};
        case 'feed/UPDATE':
            return {
                habits: feed.habits.map((item) => (item._id === action.payload._id ? action.payload : item)),
                logs: feed.logs.map((item) => (item._id === action.payload._id ? action.payload : item)),
                posts: feed.posts.map((item) => (item._id === action.payload._id ? action.payload : item))
            }
        default:
            return feed;
    }
}