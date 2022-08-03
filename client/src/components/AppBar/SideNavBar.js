import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';

import { Container, Drawer, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import BalanceRoundedIcon from '@mui/icons-material/BalanceRounded';

const SideNavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));
  
    useEffect(() => {
        const token = auth?.token;
        if (token) {
            const decodedToken = jwt_decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch({type: 'auth/LOGOUT'});
                navigate('/');
            }
          }
    }, [auth]);

    return (
        <Drawer sx={{ width: "220px", flexShrink: 0}} variant="permanent" anchor="left">
            <Toolbar>
                <BalanceRoundedIcon sx={{ display: "flex", mr: 1}}/>
                <Typography variant="h6" noWrap component={Link} to='/'
                    sx={{
                        mr: 2,
                        display: "flex",
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>
                    Happits
                </Typography>
            </Toolbar>

            <Divider/>

            <List>
                <ListItem key="Dashboard">
                    <ListItemButton component={Link} to="/dashboard">
                        <ListItemText primary="Dashboard"/>
                    </ListItemButton>
                </ListItem>
                <ListItem key="MyProfile">
                    <ListItemButton component={Link} to={"/profile/"+auth.user.id}>
                        <ListItemText primary="My Profile"/>
                    </ListItemButton>
                </ListItem>
                {/* <ListItem key="Account">
                    <ListItemButton component={Link} to={"/account"}>
                        <ListItemText primary="Account/Settings"/>
                    </ListItemButton>
                </ListItem> */}
                <ListItem key="Feed">
                    <ListItemButton component={Link} to="/feed">
                        <ListItemText primary="Feed"/>
                    </ListItemButton>
                </ListItem>
                <ListItem key="Explore">
                    <ListItemButton component={Link} to="/explore">
                        <ListItemText primary="Explore"/>
                    </ListItemButton>
                </ListItem>
                {/* <ListItem key="Groups">
                    <ListItemButton component={Link} to="/groups">
                        <ListItemText primary="Groups"/>
                    </ListItemButton>
                </ListItem> */}
            </List>
        </Drawer>
    )
}

export default SideNavBar;