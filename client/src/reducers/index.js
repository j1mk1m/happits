import { combineReducers } from "redux";
import posts from './posts.js';
import user from './user.js'
import auth from "./auth.js";
import habits from "./habits.js";
import logs from "./logs.js";
import explore from "./explore.js";
import feed from "./feed.js";
import profile from "./profile.js";
export default combineReducers({
    user,
    auth,
    posts,
    habits,
    logs,
    explore,
    feed,
    profile
});