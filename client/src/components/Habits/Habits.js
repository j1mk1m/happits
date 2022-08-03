import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Box, Typography, Button, Grid, IconButton, Toolbar, Paper, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add';
import { Popup } from 'reactjs-popup';

import Habit from './Habit/Habit.js';
import HabitViewOnly from "./Habit/HabitViewOnly.js";
import HabitEditor from "./HabitEditor.js";

const Habits = ({habitsData}) => {
    const habits = useSelector((state) => state.habits);

    return (
        <Grid item xs={12} lg={7} sx={{m: 0, p: 0}}>
            <Paper elevation={5} sx={{m: 1, px: 2, pt: 1, pb: 2, borderRadius: '10px', minHeight: "300px"}}>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant='h6' sx={{flexGrow: 1}}>Habits</Typography>
                    {!habitsData && <Popup
                        trigger={open => (<IconButton size="large"><AddIcon/></IconButton>)}
                        modal nested>
                        {close => (<HabitEditor close={close}/>)}
                    </Popup>}
                </Box>
                <Box component='div' sx={{ display: "flex", flexDirection: "column", height: "250px", overflow: "auto"}}>
                    {habitsData ? (habitsData.length > 0 ?
                    habitsData.map((habit) => (
                        <HabitViewOnly key={habit._id} habit={habit}/>
                    )) : <Box sx={{display: "flex", height: "100px", width: "100%", justifyContent: "center", alignItems: "center"}}>
                            <Typography variant='p'>No habits to show.</Typography>
                        </Box>)
                    :
                    (habits.length > 0 ? 
                        habits.map((habit) => (
                            <Habit key={habit._id} habit={habit}/>
                        )) : 
                        <Box sx={{display: "flex", height: "100px", width: "100%", justifyContent: "center", alignItems: "center"}}>
                            <Typography variant='p'>You do not have any habits yet. Click the add icon to create your new habit!</Typography>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Grid>
    );
};

export default Habits;