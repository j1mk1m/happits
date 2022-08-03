import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { Box, Container, Typography, IconButton, Avatar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import { acceptRequest, rejectRequest } from "../../actions/user";

const Request = ({user}) => {
    const imageSize = "50px";

    const dispatch = useDispatch();

    const accept = () => {
        dispatch(acceptRequest(user._id));
    }
    const reject = () => {
        dispatch(rejectRequest(user._id));
    }

    return (
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", my: 1}}>
            <Avatar alt={user.username} src={user.profileImage} sx={{width: imageSize, height: imageSize, mr: 2}}/>
            <Box sx={{display: 'flex', height: "50px", flexDirection: "column", justifyContent: "left", flexGrow: 1, overflow: "auto"}}>
                <Link to={"/profile/" + user._id} style={{textDecoration: "none"}}><Typography key={user._id} sx={{color: "black"}}>{user.username}</Typography></Link>
                <Typography key={user.name} sx={{display: "flex", color: "gray"}}>{user.name ? user.name : "No Name"}</Typography>
            </Box>
            <IconButton onClick={accept} sx={{display: 'flex'}}> <CheckIcon/> </IconButton>
            <IconButton onClick={reject} sx={{display: 'flex'}}> <NotInterestedIcon/> </IconButton>
        </Box>
    );
}

export default Request;