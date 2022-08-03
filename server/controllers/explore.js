import Habit from "../models/habit.js";
import User from '../models/user.js';
import Log from '../models/log.js';
import Post from '../models/post.js';

export const getAllUsers = async (req, res) => {
    const id = req.id;
    try {
        const user = await User.findById(id);
        const users = await User.find({_id: {$nin: user.partners.concat(user.requests), $ne: id}}, 'name username profileImage');
        res.status(200).json({
            message: "Users successfully retrieved",
            users
        });
    } catch (error) {
        res.status(401).json({
            message: "Could not retrieve users",
            error: error.message
        })
    }
}

export const getExplore = async (req, res) => {
    const id = req.id;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }
        const habits = await Habit.find({creator: {$ne: id, $nin: user.partners}, visibility: "Public", status: "Active"}).populate("creator", "name username").sort({"createdAt": -1}).limit(10);
        const logs = await Log.find({creator: {$ne: id, $nin: user.partners}, visibility: "Public", status: "Active"}).populate("creator", "name username").populate("habit", "name").sort({"createdAt": -1}).limit(10);
        const posts = await Post.find({creator: {$ne: id, $nin: user.partners}, visibility: "Public", status: "Active"}).populate("creator", "name username").populate("habit", "name").sort({"createdAt": -1}).limit(10);
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