import Post from "../models/post.js";
import User from '../models/user.js';

export const getPosts = async (req, res) => {
    const id = req.id;

    try {
        const posts = await Post.find({ creator: id, status: "Active" }).populate("habit", "name");
        res.status(200).json({
            message: "Posts retrieved successfully",
            posts
        });
    } catch (error) {
        res.status(404).json({
            message: "Posts could not be retrieved",
            error: error.message
        });
    }
}

export const createPost = async (req, res) => {
    let post = req.body;
    const userID = req.id;

    if (userID !== post.creator) {
        return res.status(400).json({ message: "User not authorized to perform this action"});
    }
    try {
        if (post.habit === "") {
            post = {...post, habit: null}
        }
        const newPost = new Post(post);
        const savedPost = await newPost.save();
        const retrievedPost = await Post.findById(savedPost._id).populate("habit", "name");
        res.status(201).json({
            message: "Post successfully created",
            post: retrievedPost
        });
    } catch (error) {
        res.status(400).json({
            message: "Post could not be created",
            error: error.message
        });
    }
}

export const updatePost = async (req, res) => {
    let updates = req.body;
    const {id: postID} = req.params;
    const userID = req.id;

    try {
        const post = await Post.findById(postID);
        if (!post) {
            return res.status(400).json({ message: "Post not found" });
        }
        if (userID != post.creator) {
            return res.status(400).json({ message: "User not authorized to perform this action" });
        }
        if (updates.habit === "") {
            updates = {...updates, habit: null}
        }
        const updatedPost = await Post.findByIdAndUpdate(postID, updates, {new: true}).populate("habit", "name");
        res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost
        })
    } catch (error) {
        res.status(401).json({
            message: "Could not update post",
            error: error.message
        });
    }
}

export const supportPost = async (req, res) => {
    const {id: postID} = req.params;
    const id = req.id;
    try {
        const post = await Post.findOne({ _id: postID, status: "Active" });
        if (!post) {
            return res.status(400).json({ message: "Post does not exist" });
        }
        let supporters = post.supporters;
        if (!supporters.includes(id)) {
            supporters.push(id);
        } else {
            supporters = supporters.filter((supporter) => supporter != id);
        }
        const newPost = await Post.findByIdAndUpdate(postID, {supporters}, {new: true}).populate("creator", "name username").populate("habit", "name");
        res.status(200).json({
            message: "Post retrieved successfully",
            post: newPost
        });
    } catch (error) {
        res.status(404).json({
            message: "Post could not be retrieved",
            error: error.message
        });
    }
}

export const archivePost = async (req, res) => {
    const { id: postID } = req.params;
    const userID = req.id;

    try {
        const post = await Post.findById(postID);
        if (!post) {
            return res.status(400).json({ message: "Post not found" });
        }
        if (userID != post.creator) {
            return res.status(400).json({ message: "User not authorized to perform this action" });
        }
        const deletedPost = await Post.findByIdAndUpdate(postID, {status: "Inactive"}, {new: true});
        res.status(200).json({
            message: "Post successfully deleted",
            post: deletedPost
        })
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const getPost = async (req, res) => {
    const {id: postID} = req.params;
    const id = req.id;
    try {
        const post = await Post.findOne({ _id: postID, status: "Active" });
        if (!post) {
            return res.status(400).json({ message: "Post does not exist" });
        }
        let display = false;
        if (post.visibility === "Public") {
            display = true;
        } else if (post.visibility === "Partner") {
            const {partners} = await User.findById(post.creator);
            if (id in partners) { display = true; }
        } else {
            if (post.creator === id) { display = true; }
        }
        if (display) {
            res.status(200).json({
                message: "Post retrieved successfully",
                post
            });
        } else {
            res.status(401).json({
                message: "User does not have access to this post"
            });
        }
    } catch (error) {
        res.status(404).json({
            message: "Post could not be retrieved",
            error: error.message
        });
    }
}
