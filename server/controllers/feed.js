import Habit from "../models/habit.js";
import User from '../models/user.js';
import Log from '../models/log.js';
import Post from '../models/post.js';

export const getFeed = async (req, res) => {
    const id = req.id;
    
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }
        const habits = await Habit.find({creator: {$in: user.partners}, visibility: {$in: ["Partner", "Public"]}, status: "Active"}).populate("creator", "name username").sort({"createdAt": -1}).limit(10);
        const logs = await Log.find({creator: {$in: user.partners}, visibility: {$in: ["Partner", "Public"]}, status: "Active"}).populate("creator", "name username").populate("habit", "name").sort({"createdAt": -1}).limit(10);
        const posts = await Post.find({creator: {$in: user.partners}, visibility: {$in: ["Partner", "Public"]}, status: "Active"}).populate("creator", "name username").populate("habit", "name").sort({"createdAt": -1}).limit(10);
        res.status(200).json({
            message: "Feed retrieved successfully",
            habits,
            logs,
            posts
        })
    } catch (error) {
        res.status(400).json({
            message: "Could not retrieve feed",
            error: error.message
        })
    }
}
