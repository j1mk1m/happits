import React, { useEffect } from "react";
import { Container, Box, Typography, Grid, Divider, IconButton, InputAdornment, Toolbar, Paper, List, ListItem, ListItemText, TextField, Select, MenuItem, InputLabel, FormControl, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { supportHabit } from "../../actions/habits";
import { supportPost } from "../../actions/posts";

const ActivityItem = ({type, item}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleSupport = (e) => {
        e.preventDefault();
        if (type === "Habit") {
            dispatch(supportHabit(item._id));
        } else {
            dispatch(supportPost(item._id));
        }
    }

    return (
        <Card sx={{ width: "100%", mx: 1, position: "relative", m: 1}}>
            <CardContent>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <Typography noWrap variant="subtitle1" component="div" sx={{flexGrow: 1}}>
                        {item.creator.name + " created a " + type}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {new Date(item.date || item.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
                    </Typography>
                    {type !== "Log" &&
                    <>
                        <IconButton onClick={handleSupport}>{item?.supporters?.includes(user._id) ? <FavoriteIcon/> : <FavoriteBorderIcon/>}</IconButton>
                        <Typography>{item.supporters?.length}</Typography>
                    </>
                    }
                </Box>
                {type !== "Post" && 
                <>
                    <Box sx={{display: 'flex', flexDirection: "row", alignItems: "center"}}>
                        <Typography noWrap variant="body1" component="div" sx={{flexGrow: 1}}>
                            {item.name || "For habit: " + item.habit.name}
                        </Typography>
                        <Typography variant="body2" component="div">
                            {item.goal ? "Goal: " + item.goal.number + " " + item.goal.times + " " + item.goal.per :
                                item.outcome + " (+" + item.number + ")"}
                        </Typography>
                    </Box>
                    <Typography variant="body2" component="div">
                        {item.note || item.description}
                    </Typography>
                    </>}
            </CardContent>
            {type === "Post" &&
            <>
            <CardMedia
                component="img"
                image={item.selectedFile}
                alt="No image"
            />
            <CardContent>
                <Typography noWrap variant="subtitle1" component="div">
                    {item.name || item.title || "Log: " + item.habit.name}
                </Typography>
                <Box sx={{maxHeight: "100px", overflow: "auto"}}>
                <Typography variant="body2" component="div">
                    {item.note || item.description}
                </Typography>
                </Box>
                <Typography variant="body2" component="div">
                    {type === "Post" && "Habit: " + (item.habit ? item.habit.name : "None")}
                </Typography>
            </CardContent>
            </>}
        </Card>
    )
}

export default ActivityItem;