import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import User from "../models/user.js";

const jwtSecret = process.env.JWT_SECRET;
const maxAge = 3 * 60 * 60;

export const register = async (req, res) => {
    const {name, username, password, email} = req.body;
    if (!name || !username || !password || !email) {
        return res.status(400).json({message: "Name, username, password, or email not provided"});
    }
    try {
        let count = await User.exists({username});
        if (count) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({ name, username, password: hash, email});
        const user = await newUser.save();
        const token = jwt.sign(
            { id: user._id, username, role: user.role},
            jwtSecret,
            { expiresIn: maxAge }
        );
        res.status(201).json({
            message: "New user successfully created",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                partners: user.partners,
                requests: user.requests,
                public: user.public
            },
            token
        });
    } catch (error) {
        res.status(401).json({ 
            message: "Could not register user",
            error: error.message
         });
    }
}

export const login = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username or password not provided" });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                message: "Login unsuccessful",
                error: "User not found"
            });
        }
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            const token = jwt.sign(
                { id: user._id, username, role: user.role},
                jwtSecret,
                { expiresIn: maxAge}
            );
            res.status(200).json({
                message: "Login successful",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    partners: user.partners,
                    requests: user.requests,
                    public: user.public
                },
                token
            });
        } else {
            res.status(401).json({
                message: "Incorrect password"
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    const id = req.id;

    if (!id || !oldPassword || !newPassword) {
        return res.status(400).json({
            message: "Passwords not provided"
        });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const result = await bcrypt.compare(oldPassword, user.password);
        if (result) {
            const hash = await bcrypt.hash(newPassword, 10);
            const user = await User.findByIdAndUpdate(id, {password: hash});
            const token = jwt.sign(
                { id: user._id, username: user.username, role: user.role},
                jwtSecret,
                { expiresIn: maxAge}
            );
            res.status(200).json({
                message: "Reset password successful",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    partners: user.partners,
                    requests: user.requests,
                    public: user.public
                },
                token
            });
        } else {
            res.status(401).json({
                message: "Incorrect old password"
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}