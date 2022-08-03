import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Container, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Popup } from 'reactjs-popup';

import HabitView from "../HabitView";

import { archiveHabit } from "../../../actions/habits";
import { supportHabit } from "../../../actions/habits";

const HabitViewOnly = (props) => {
    const dispatch = useDispatch();
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));
    const [viewOpen, setViewOpen] = React.useState(false);
    
    const closeModal = () => {
        setViewOpen(false);
    }
    const handleSupport = (e) => {
        e.preventDefault();
        dispatch(supportHabit(props.habit._id));
    }

    return (
        <Container style={{padding: 0}} sx={{ bgcolor: "#e6e3e3", border: "solid black 2px", my: "5px", borderRadius: "5px"}}>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                {props.habit.visibility === "Private" ? <PersonIcon sx={{ mx: 1 }} title="Private"/> : 
                (props.habit.visibility === "Partner" ? <PeopleIcon sx={{ mx: 1 }}/> : 
                <PublicIcon sx={{ mx: 1 }}/>)}
                <Button onClick={() => {setViewOpen(true);}} style={{textTransform: "none"}} sx={{ mx: 1, display: 'flex', flexGrow: 1, justifyContent: "left" }}><Typography sx={{color: "black"}}>{props.habit.name}</Typography></Button>
                <IconButton onClick={handleSupport}>{props.habit.supporters.includes(auth.user.id) ? <FavoriteIcon/> : <FavoriteBorderIcon/>}</IconButton>
                <Typography sx={{mr: 1}}>{props.habit.supporters.length}</Typography>
            </Box>
            <Popup open={viewOpen} onClose={closeModal} modal nested>
                <HabitView habit={props.habit}/>
            </Popup>
        </Container>
    );
};

export default HabitViewOnly;