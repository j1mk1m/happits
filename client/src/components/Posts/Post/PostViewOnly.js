import React, {useState} from "react";
import { Container, Box, Typography, Card, CardMedia, CardContent, CardActions, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


import { archivePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";

import { supportPost } from "../../../actions/posts";

const PostViewOnly = ({post}) => {
    const dispatch = useDispatch();
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));

    const handleSupport = () => {
        dispatch(supportPost(post._id));
    }

    return (
        <Card sx={{ minWidth: "250px", maxWidth: "250px", mx: 1 }}>
            <CardContent sx={{p: 1}}>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    {post.visibility === "Public" ? 
                    <PublicIcon/> : (post.visibility === "Partner" ? <PeopleIcon/> : <PersonIcon/>)}
                    <IconButton onClick={handleSupport}>{post.supporters.includes(auth.user.id) ? <FavoriteIcon/> : <FavoriteBorderIcon/>}</IconButton>
                    <Typography sx={{flexGrow: 1}}>{post.supporters?.length}</Typography>
                </Box>
            </CardContent>
            <CardMedia
                component="img"
                width="100%"
                image={post.selectedFile}
                alt="No image"
            />
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
        </Card>
    );
};

export default PostViewOnly;