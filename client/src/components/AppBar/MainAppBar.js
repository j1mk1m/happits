import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { Box, Container, Drawer, Toolbar, List, Typography, Avatar, IconButton, Divider, ListItem, ListItemButton, ListItemText, ListItemIcon, Menu, MenuItem, Button } from "@mui/material";
import BalanceRoundedIcon from '@mui/icons-material/BalanceRounded';

const MainAppBar = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let user = useSelector((state) => state.user);
    const [anchorEl, setAnchorEl] = useState(null);
    const auth = JSON.parse(localStorage.getItem('auth'));
    const imageSize = "40px";

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        dispatch({type: 'auth/LOGOUT'});
        navigate('/');
    }
    return (
        <Toolbar disableGutters>
            <Box sx={{display: "flex", flexDirection: "row", width: "100%", alignItems: "center"}}>
                <Typography sx={{ml: 2, flexGrow: 1}} variant="h5">{props.title}</Typography>
                <Typography sx={{mx: 2}} variant="p">{"Welcome, " + auth?.user.username}</Typography>
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <Avatar alt={user.username} src={user.profileImage} sx={{width: imageSize, height: imageSize}}/>
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem key="account" component={Link} to="/account" onClick={handleClose}>Account</MenuItem>
                    <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Box>
        </Toolbar>
    )
}

export default MainAppBar;