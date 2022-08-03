import mongoose from "mongoose";

const logSchema = mongoose.Schema({
    habit: {
        type: mongoose.Schema.ObjectId,
        ref: "Habit",
        required: true
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    outcome: {
        type: String,
        default: "Undetermined"
    },
    number: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: new Date()
    },
    note: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "Active"
    }
}, { timestamps: true });

const Log = mongoose.model('Log', logSchema);
export default Log;