export default (logs=[], action) => {
    switch (action.type) {
        case 'log/GET':
            return action.payload.logs;
        case 'log/CREATE':
            return [...logs, action.payload];
        case 'log/UPDATE':
            return logs.map((log) => (log._id === action.payload._id ? action.payload : log));
        case 'log/ARCHIVE':
            return logs.filter((log) => log._id !== action.payload._id);
        default:
            return logs;
    }
};