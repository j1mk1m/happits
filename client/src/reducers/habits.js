export default (habits=[], action) => {
    switch (action.type) {
        case 'h/GET':
            return action.payload.habits;
        case 'h/CREATE':
            return [...habits, action.payload];
        case 'h/UPDATE':
            return habits.map((habit) => (habit._id === action.payload._id ? action.payload : habit));
        case 'h/ARCHIVE':
            return habits.filter((habit) => habit._id !== action.payload._id);
        default:
            return habits;
    }
};