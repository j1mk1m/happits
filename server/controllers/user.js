import Post from '../models/post.js';
import Habit from '../models/habit.js';
import User from "../models/user.js";

export const getUserInfo = async (req, res) => {
    const id = req.id;
    
    try {
        const user = await User.findById(id).populate("partners", "name username profileImage").populate("requests", "name username profileImage");
        res.status(200).json({
            message: "User info retrieved successfully",
            user
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not retrieve user info",
            error: error.message
        });
    }
}

export const getUser = async (req, res) => {
    const {id:userID} = req.params;
    const id = req.id;

    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        let posts = [];
        let habits = [];
        if (userID == id) {
            posts = await Post.find({creator: userID, status: "Active"}).populate("habit", "name");
            habits = await Habit.find({creator: userID, status: "Active"});
        } else if (user.partners.includes(id)) {
            posts = await Post.find({creator: userID, status: "Active", visibility: {$in: ["Partner", "Public"]}}).populate("habit", "name");
            habits = await Habit.find({creator: userID, status: "Active", visibility: {$in: ["Partner", "Public"]}});
        } else {
            posts = await Post.find({creator: userID, status: "Active", visibility: "Public"}).populate("habit", "name");
            habits = await Habit.find({creator: userID, status: "Active", visibility: "Public"});
        }
        res.status(200).json({
            message: "User successfully found",
            user: {
                name: user.name,
                id: user._id,
                username: user.username,
                partners: user.partners
            },
            posts,
            habits
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const requestPartner = async (req, res) => {
    const {id:userID} = req.params;
    const id = req.id;

    try {
        const user = await User.findById(userID);
        const requester = await User.findById(id);
        if (!user || !requester) {
            return res.status(400).json({ message: "User not found" });
        }
        let requests = user.requests;
        requests.push(requester._id);
        const newUser = await User.findByIdAndUpdate(userID, {requests}, {new: true});
        res.status(200).json({
            message: "Partner request successfully added",
            user: newUser
        });
    } catch (error) {
        res.status(401).json({
            message: "Could not request",
            error: error.message
        })
    }
}

export const removePartner = async (req, res) => {
    const {id:userID} = req.params;
    const id = req.id;

    try {
        const user = await User.findById(id);
        const removeUser = await User.findById(userID);
        if (!user || !removeUser) {
            return res.status(400).json({ message: "User not found" });
        }
        let partners = user.partners;
        partners = partners.filter(id => (id != userID));
        const newUser = await User.findByIdAndUpdate(id, {partners}, {new: true}).populate("partners", "name username profileImage").populate("requests", "name username profileImage");
        let removeePartners = removeUser.partners;
        removeePartners = removeePartners.filter(id => (id != id));
        await User.findByIdAndUpdate(userID, {partners: removeePartners});
        res.status(200).json({
            message: "Partner successfully added",
            user: newUser
        });
    } catch (error) {
        
    }
}

export const acceptRequest = async (req, res) => {
    const id = req.id;
    const {id: requestID} = req.params;
    try {
        const user = await User.findById(id);
        let requests = user.requests;
        let partners = user.partners;
        const requester = await User.findById(requestID);
        let requesterPartners = requester.partners;
        if (requests.includes(requestID)) {
            partners.push(requestID);
            requests = requests.filter(id => (id != requestID));
            
            requesterPartners.push(user._id);
        }
        const newUser = await User.findByIdAndUpdate(id, {requests, partners}, {new: true}).populate("partners", "name username profileImage").populate("requests", "name username profileImage");
        await User.findByIdAndUpdate(requestID, {partners: requesterPartners});
        res.status(200).json({
            message: "Partner successfully added",
            user: newUser
        });
    } catch (error) {
        res.status(401).json({
            message: "Could not accept partner request",
            error: error.message
        })
    }
}

export const rejectRequest = async (req, res) => {
    const id = req.id;
    const {id: requestID} = req.params;
    try {
        const user = await User.findById(id);
        let requests = user.requests;
        requests = requests.filter(id => (id != requestID));
        const newUser = await User.findByIdAndUpdate(id, {requests}, {new: true}).populate("partners", "name username profileImage").populate("requests", "name username profileImage");
        res.status(200).json({
            message: "Partner successfully added",
            user: newUser
        });
    } catch (error) {
        res.status(401).json({
            message: "Could not accept partner request",
            error: error.message
        })
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const updates = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, updates, {new: true}).populate("partners", "name username profileImage").populate("requests", "name username profileImage");
        res.status(200).json({
            message: "User updated successfully",
            user
        })
    } catch (error) {
        res.status(400).json({
            message: "Could not update user",
            error: error.message
        })
    }
}