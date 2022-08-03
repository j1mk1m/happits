import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: {
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
    selectedFile: {
        type: String,
        default: null
    },
    supporters: {
        type: [String],
        default: []
    },
    habit: {
        type: mongoose.Schema.ObjectId,
        ref: "Habit"
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

const Post = mongoose.model('Post', postSchema);

export default Post;