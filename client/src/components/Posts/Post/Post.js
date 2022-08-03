import React from "react";
import { Container, Box, Typography, Card, CardMedia, CardContent, CardActions, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Popup } from 'reactjs-popup';

import PostEditor from "../PostEditor";
import PostView from "../PostView";

import { archivePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";

const Post = ({post}) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEdit = () => {
        setAnchorEl(null);
        setOpen(true);
    }
    const handleArchive = () => {
        setAnchorEl(null);
        dispatch(archivePost(post._id));
    }
    const closeModal = () => {
        setOpen(false);
    }

    return (
        <Card sx={{ minWidth: "250px", maxWidth: "250px", mx: 1 }}>
            <CardContent sx={{p: 1}}>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    {post.visibility === "Public" ? 
                    <PublicIcon /> : (post.visibility === "Partner" ? <PeopleIcon/> : <PersonIcon/>)}
                    <FavoriteIcon sx={{mx: 1}}/>
                    <Typography sx={{flexGrow: 1}}>{post.supporters?.length}</Typography>
                    <IconButton onClick={handleClick} sx={{display: "flex"}}><MoreVertIcon/></IconButton>
                </Box>
            </CardContent>
            <CardMedia
                component="img"
                width="100%"
                image={post.selectedFile}
                alt="No image" sx={{maxHeight: "300px"}}/>
            <Menu id="habit-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleArchive}>Archive</MenuItem>
            </Menu>
            <CardContent>
                <Typography noWrap variant="subtitle1" component="div">
                    {post.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    {new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
                </Typography>
                <Box sx={{maxHeight: "100px", overflow: "auto"}}>
                <Typography variant="body2" component="div">
                    {post.description}
                </Typography>
                </Box>
                <Typography variant="body2" component="div">
                    {"Habit: " + (post.habit ? post.habit.name : "None")}
                </Typography>
            </CardContent>
            <Popup open={open} onClose={closeModal} modal nested>
                <PostEditor id={post._id} close={closeModal} form={post} update/>
            </Popup>
        </Card>
    );
};

export default Post;