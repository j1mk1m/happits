import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase64 from 'react-file-base64';

import { Box, Paper, Grid, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Button} from '@mui/material';
import DatePicker from 'react-date-picker';

import { createLog, updateLog } from '../../actions/logs';

const LogEditor = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const habits = useSelector((state) => state.habits);
    const [form, setForm] = useState(props.form? 
        {...props.form, habit: props.form.habit._id}
        : {
        habit: props.habit?._id || "",
        outcome: props.outcome || "",
        number: props.outcome === "Success" ? 1 : 0,
        note: ""
    });
    const [date, setDate] = useState(props.form?.date ? new Date(props.form.date) : new Date());
    const [times, setTimes] = useState(props.habit?.goal.times || "Times");


    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
        if (name === "habit") {
            setTimes(habits.filter((habit) => habit._id === value)[0].goal.times);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.close();
        if (props.id) {
            dispatch(updateLog(props.id, {...form, date}));
        } else {
            dispatch(createLog({...form, date, creator: user._id}));
        }
    }

    return (
        <Paper elevation={5} sx={{width: "500px", borderRadius: "15px"}}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{mx: 1}}>
                        <Typography variant="h6" sx={{textAlign: "center"}}>Log Editor</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{mx: 1}}>
                        <Typography>Date: </Typography>
                        <DatePicker name="date" onChange={setDate} value={date} maxDate={new Date()} required></DatePicker>
                    </Grid>
                    <Grid item xs={6} sx={{ml: 1}}>
                        <FormControl variant='filled' size="small" fullWidth>
                            <InputLabel>Habit</InputLabel>
                            <Select name="habit" value={form.habit} label="Habit" required onChange={handleChange}>
                                {habits.map((habit) => (
                                    <MenuItem key={habit._id} value={habit._id}>{habit.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5} sx={{mr: 1}}>
                        <FormControl variant='filled' size="small" fullWidth>
                            <InputLabel>Outcome</InputLabel>
                            <Select name="outcome" value={form.outcome} label="Outcome" required onChange={handleChange}>
                                <MenuItem value={"Success"}>Success</MenuItem>
                                <MenuItem value={"Failure"}>Failure</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{mx: 1}}>
                        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "left"}}>
                        <TextField name="number" label="Number" value={form.number} onChange={handleChange} variant="filled" size="small" sx={{width: "100px", mr: 1}} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} ></TextField>
                        <Typography>{times}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{mx: 1}}>
                        <TextField name="note" label="Note" value={form.note} onChange={handleChange} variant="filled" multiline rows={2} fullWidth></TextField>
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

export default LogEditor;