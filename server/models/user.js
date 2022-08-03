import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Basic',
        required: true
    },
    partners: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }],
        default: []
    },
    requests: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }],
        default: []
    },
    profileImage: {
        type: String,
        default: null
    },
    public: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;