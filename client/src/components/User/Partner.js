import React from "react";
import { useDispatch } from "react-redux";

import { useNavigate, Link } from "react-router-dom";

import { Box, Typography, Button, Avatar } from '@mui/material';
import { removePartner } from "../../actions/user";

const Partner = ({user}) => {
    const dispatch = useDispatch();
    const imageSize = "50px";

    const handleRemove = () => {
        dispatch(removePartner(user._id));
    }

    return (
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", my: 1}}>
            <Avatar alt={user.username} src={user.profileImage} sx={{width: imageSize, height: imageSize, mr: 2}}/>
            <Box sx={{display: 'flex', height: "50px", flexDirection: "column", justifyContent: "left", flexGrow: 1, overflow: "auto"}}>
                <Link to={"/profile/" + user._id} style={{textDecoration: "none"}}><Typography key={user._id} sx={{color: "black"}}>{user.username}</Typography></Link>
                <Typography key={user.name} sx={{display: "flex", color: "gray"}}>{user.name ? user.name : "No Name"}</Typography>
            </Box>
            <Button onClick={handleRemove}>Remove</Button>
        </Box>
    );
}

export default Partner;