import mongoose from "mongoose";

const habitSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    good: {
        type: Boolean,
        default: true
    },
    goal: {
        type: {
            number: Number,
            times: String,
            per: String
        },
        default: {
            number: 1,
            times: "Times",
            per: "Daily"
        }
    },
    supporters: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }],
        default: []
    },
    group: {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
        default: null
    },
    visibility: {
        type: String,
        default: "Private"
    },
    status: {
        type: String,
        default: "Active"
    }
}, { timestamps: true });

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;