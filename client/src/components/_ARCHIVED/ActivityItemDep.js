import React, { useEffect } from "react";
import { Container, Box, Typography, Grid, Divider, IconButton, InputAdornment, Toolbar, Paper, List, ListItem, ListItemText, TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { supportHabit } from "../../actions/habits";
import { supportPost } from "../../actions/posts";
import { supportLog } from "../../actions/logs"; //depreciated

const ActivityItem = ({type, habit, item}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleSupport = (e) => {
        e.preventDefault();
        if (type === "Habit") {
            dispatch(supportHabit(item._id));
        }
    }

    return (
        <Container style={{padding: 0}} sx={{ border: "solid black 2px", my: "5px", borderRadius: "5px"}}>
            <Box sx={{display: "flex", flexWrap: "wrap", flexDirection: "row", alignItems: "center", mx: 1}}>
                <Typography sx={{ ml: 1 }}>{item?.creator.name + " (" + item?.creator.username + ")"}</Typography>
                <Typography sx={{ mx: 1, color: "gray" }}>{" created " + (habit? "habit " : "log for ")}</Typography>
                <Box sx={{ fontStyle: 'italic', mr: 1, flexGrow: 1}}><Typography>{habit? item?.name : item?.habit.name}</Typography></Box>
                <Typography sx={{ mx: 1, color: "gray" }}>{new Date(item?.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</Typography>
                
                <IconButton onClick={handleSupport}>{item?.supporters?.includes(user._id) ? <FavoriteIcon/> : <FavoriteBorderIcon/>}</IconButton>
                {item.supporters?.length}
            </Box>
        </Container>
    )
}

export default ActivityItem;