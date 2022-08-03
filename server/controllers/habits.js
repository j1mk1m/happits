import Habit from "../models/habit.js";
import Log from '../models/log.js';

export const getHabits = async (req, res) => {
    const id = req.id;
    try {
        const habits = await Habit.find({creator: id, status: "Active"});
        res.status(200).json({
            message: "Habits retrieved successfully",
            habits
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not retrieve habits",
            error: error.message
        });
    }
}

export const createHabit = async (req, res) => {
    const habit = req.body;
    const userID = req.id;

    if (userID != habit.creator) {
        return res.status(400).json({ message: "User not authorized to perform this action"});
    }
    try {
        const newHabit = new Habit(habit);
        const savedHabit = await newHabit.save();
        res.status(201).json({
            message: "Habit successfully created",
            habit: savedHabit
        });
    } catch (error) {
        res.status(400).json({
            message: "Habit could not be created",
            error: error.message
        });
    }
}

export const updateHabit = async (req, res) => {
    const updates = req.body;
    const {id: habitID} = req.params;
    const userID = req.id;

    try {
        const habit = await Habit.findById(habitID);
        if (!habit) {
            return res.status(400).json({ message: "Habit not found" });
        }
        if (userID != habit.creator) {
            return res.status(400).json({ message: "User not authorized to perform this action" });
        }
        const updatedHabit = await Habit.findByIdAndUpdate(habitID, updates, {new: true});
        res.status(200).json({
            message: "Habit updated successfully",
            habit: updatedHabit
        })
    } catch (error) {
        res.status(401).json({
            message: "Could not update habit",
            error: error.message
        });
    }
}

export const supportHabit = async (req, res) => {
    const {id: habitID} = req.params;
    const id = req.id;
    try {
        const habit = await Habit.findOne({ _id: habitID, status: "Active" });
        if (!habit) {
            return res.status(400).json({ message: "Habit does not exist" });
        }
        
        let supporters = habit.supporters;
        if (!supporters.includes(id)) {
            supporters.push(id);
        } else {
            supporters = supporters.filter((supporter) => supporter != id);
        }
        const newHabit = await Habit.findByIdAndUpdate(habitID, {supporters}, {new: true}).populate("creator", "_id name username");
        res.status(200).json({
            message: "Support action performed successfully",
            habit: newHabit
        });
    } catch (error) {
        res.status(404).json({
            message: "Could not perform support action",
            error: error.message
        });
    }
}

export const archiveHabit = async (req, res) => {
    const { id: habitID } = req.params;
    const userID = req.id;

    try {
        const habit = await Habit.findById(habitID);
        if (!habit) {
            return res.status(400).json({ message: "Habit not found" });
        }
        if (userID != habit.creator) {
            return res.status(400).json({ message: "User not authorized to perform this action" });
        }
        const deletedHabit = await Habit.findByIdAndUpdate(habitID, {status: "Inactive"}, {new: true});
        const logs = await Log.find({habit: habitID});
        for (let log of logs) {
            await log.updateOne({status: "Inactive"});
        }
        res.status(200).json({
            message: "Habit successfully deleted",
            habit: deletedHabit
        })
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
