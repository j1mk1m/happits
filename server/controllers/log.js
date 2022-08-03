import Habit from "../models/habit.js";
import Log from '../models/log.js';

export const getLogs = async (req, res) => {
    const userID = req.id;

    try {
        const logs = await Log.find({creator: userID, status: "Active"}).populate("habit", "name");
        res.status(200).json({
            message: "Logs retrieved successfully",
            logs
        })
    } catch (error) {
        res.status(401).json({
            message: "Could not retrieve logs",
            error: error.message
        })
    }
}

export const createLog = async (req, res) => {
    const log = req.body;
    const userID = req.id;

    try {
        const habit = await Habit.findById(log.habit);
        if (!habit) {
            return res.status(400).json({ message: "Habit not found" });
        }
        if (userID != habit.creator) {
            return res.status(400).json({ message: "User not authorized to perform this action" });
        }
        const newLog = new Log(log);
        const savedLog = await newLog.save();
        const retrievedLog = await Log.findById(savedLog._id).populate("habit", "name");
        res.status(201).json({
            message: "Log created successfully",
            log: retrievedLog
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not create log",
            error: error.message
        });
    }
}

export const updateLog = async (req, res) => {
    const {id: logID} = req.params;
    const updates = req.body;
    const userID = req.id

    try {
        const log = await Log.findById(logID);
        if (!log) {
            return res.status(400).json({ message: "Log not found" });
        }
        if (userID != log.creator) {
            return res.status(400).json({ message: "User not authorized to perform this action" });
        }
        const updatedLog = await Log.findByIdAndUpdate(logID, updates, {new: true}).populate("habit", "name");
        res.status(200).json({
            message: "Log updated successfully",
            log: updatedLog
        })
    } catch (error) {
        res.status(400).json({
            message: "Could not update log",
            error: error.message
        })
    }
}

export const supportLog = async (req, res) => {
    const {id: logID} = req.params;
    const id = req.id;
    try {
        const log = await Log.findOne({ _id: logID, status: "Active" });
        if (!log) {
            return res.status(400).json({ message: "Log does not exist" });
        }
        
        let supporters = log.supporters;
        if (!supporters.includes(id)) {
            supporters.push(id);
        } else {
            supporters = supporters.filter((supporter) => supporter != id);
        }
        const newLog = await Log.findByIdAndUpdate(logID, {supporters}, {new: true}).populate("creator", "name username").populate("habit", "name");
        res.status(200).json({
            message: "Support action performed successfully",
            habit: newLog
        });
    } catch (error) {
        res.status(404).json({
            message: "Could not perform support action",
            error: error.message
        });
    }
}

export const archiveLog = async (req, res) => {
    const { id: logID } = req.params;
    const userID = req.id;

    try {
        const log = await Log.findById(logID);
        if (!log) {
            return res.status(400).json({ message: "Log not found" });
        }
        if (userID !== log.creator) {
            return res.status(400).json({ message: "User not authorized to perform this action" });
        }
        const deletedLog = await Log.findByIdAndUpdate(logID, {status: "Inactive"}, {new: true});
        res.status(200).json({
            message: "Log successfully deleted",
            log: deletedLog
        });
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}