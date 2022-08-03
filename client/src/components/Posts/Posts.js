import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Typography, IconButton, Grid, Paper, Card, CardMedia, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { Popup } from 'reactjs-popup';

import PostEditor from "./PostEditor";
import Post from "./Post/Post";
import PostViewOnly from "./Post/PostViewOnly";

const Posts = ({postsData}) => {
    const posts = useSelector((state) => state.posts);

    return (
        <Grid item xs={12} sx={{m: 0}}>
            <Paper elevation={5} sx={{m: 1, px: 2, pt: 1, pb: 2, borderRadius: '10px', minHeight: "300px"}}>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <Typography variant="h6" sx={{display: "flex", flexGrow: 1}}>Posts</Typography>
                    {!postsData && <Popup
                        trigger={open => (<IconButton size="large"><AddIcon/></IconButton>)}
                        modal nested>
                        {close => (<PostEditor close={close}/>)}
                    </Popup>}
                </Box>
                <Box sx={{display: "flex", flexDirection: "row", overflow: "auto"}}>
                {postsData ? 
                (postsData.length > 0 ? postsData.map((post) => (
                    <PostViewOnly key={post._id} post={post}/>)) 
                    : 
                    <Box sx={{display: "flex", height: "100px", width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <Typography variant="p">No posts to show.</Typography>                    
                    </Box>)
                :
                (posts.length > 0 ? posts.map((post) => (
                    <Post key={post._id} post={post}/>))
                    : 
                    <Box sx={{display: "flex", height: "100px", width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <Typography variant="p">You do not have any posts yet. Click the add icon to create a new post!</Typography>                    
                    </Box>)}
            </Box>
            </Paper>
        </Grid>
    )
}

export default Posts;