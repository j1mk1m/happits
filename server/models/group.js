import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
    name: String,
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    admins: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }],
        default: []
    },
    members: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }],
        default: []
    },
    habits: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "Habit"
        }],
        default: []
    },
    visibility: {
        type: String,
        default: "Public"
    }
});

const Group = mongoose.model('Group', groupSchema);

export default Group;