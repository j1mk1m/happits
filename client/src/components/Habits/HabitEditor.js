import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Paper, Grid, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Button} from '@mui/material';

import { createHabit, updateHabit } from "../../actions/habits.js";

const HabitEditor = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [form, setForm] = React.useState(props.form ? props.form : {
        name: "",
        description: "",
        goal: {
            number: 1,
            times: "Times",
            per: "Daily"
        },
        visibility: "",
        good: true,
        status: "Active"
    });

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }
    const handleGoalChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setForm({
            ...form,
            goal: {
                ...form.goal,
                [name]: value
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.close();
        if (props.id) {
            dispatch(updateHabit(props.id, form));
        } else {
            dispatch(createHabit({...form, creator: user._id}));
        }
    }
    
    return (
        <Paper elevation={5} sx={{width: "500px", borderRadius: "15px"}}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{mx: 1}}>
                        <Typography variant="h6" sx={{textAlign: "center"}}>Habit Editor</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{mx: 1}}>
                        <TextField name="name" label="Name" value={form.name} onChange={handleChange} variant="filled" required autoFocus fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12} sx={{mx: 1}}>
                        <TextField name="description" label="Description" value={form.description} onChange={handleChange} variant="filled" multiline rows={3} fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12} sx={{mx: 1}}>
                        <Box sx={{bgcolor: "yellow", borderRadius: "10px"}}>
                            <Typography sx={{textAlign: "center"}}>Goal</Typography>
                            <Grid container spacing={1} sx={{mx: 1}}>
                                <Grid item xs={3}>
                                    <TextField name="number" label="Number" value={form.goal.number} onChange={handleGoalChange} variant="filled" size="small" fullWidth inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} ></TextField>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl variant='filled' sx={{width: "150px"}} size="small">
                                        <InputLabel>Times</InputLabel>
                                        <Select name="times" value={form.goal.times} label="Times" onChange={handleGoalChange}>
                                            <MenuItem value={"Times"}>Times</MenuItem>
                                            <MenuItem value={"Minutes"}>Minutes</MenuItem>
                                        </Select>
                                    </FormControl>                                
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl variant='filled' sx={{width: "150px"}} size="small">
                                        <InputLabel>Per</InputLabel>
                                        <Select name="per" value={form.goal.per} label="Per" onChange={handleGoalChange}>
                                            <MenuItem value={"Daily"}>Daily</MenuItem>
                                            <MenuItem value={"Weekly"}>Weekly</MenuItem>
                                            <MenuItem value={"Monthly"}>Monthly</MenuItem>
                                        </Select>
                                    </FormControl>                                
                                </Grid>
                            </Grid>
                            </Box>
                    </Grid>
                    <Grid item xs={12} sx={{mx: 1}}>
                        <FormControl variant='filled' sx={{width: "150px"}} size="small">
                            <InputLabel>Visbility</InputLabel>
                            <Select name="visibility" value={form.visibility} label="Visibility" required onChange={handleChange}>
                                <MenuItem value={"Private"}>Private</MenuItem>
                                <MenuItem value={"Partner"}>Partner</MenuItem>
                                <MenuItem value={"Public"}>Public</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{mx: 1}}>
                        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "right"}}>
                            <Button onClick={props.close}>Cancel</Button>
                            <Button type='submit'>Save</Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default HabitEditor;