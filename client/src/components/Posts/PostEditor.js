import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase64 from 'react-file-base64';

import { Box, Paper, Grid, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Button} from '@mui/material';

import { createPost, updatePost } from '../../actions/posts';

const PostEditor = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const habits = useSelector((state) => state.habits);
    const [form, setForm] = useState(props.form? {...props.form, habit: props.form.habit? props.form.habit?._id: ""} : {
        title: "",
        habit: props.habit?._id || "",
        description: "",
        selectedFile: "",
        visibility: ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.close();
        if (props.update) {
            dispatch(updatePost(props.id, form));
        } else {
            dispatch(createPost({...form, creator: user._id}));
        }
    }

    return (
        <Paper elevation={5} sx={{width: "500px", borderRadius: "15px"}}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} >
                    <Grid item xs={12} sx={{mx: 1}}>
                        <Typography variant="h6" sx={{textAlign: "center"}}>Post Editor</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{mx: 1}}>
                        <TextField name="title" label="Title" value={form.title} onChange={handleChange} variant="filled" required autoFocus fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12} sx={{mx: 1}}>
                        <TextField name="description" label="Description" value={form.description} onChange={handleChange} variant="filled" multiline rows={2} fullWidth></TextField>
                    </Grid>
                    <Grid item xs={6} sx={{ml: 1}}>
                        <FormControl variant='filled' size="small" fullWidth>
                            <InputLabel>Habit</InputLabel>
                            <Select name="habit" value={form.habit} label="Habit" onChange={handleChange}>
                                <MenuItem key={"NA"} value={""}>None</MenuItem>
                                {habits.map((habit) => (
                                    <MenuItem key={habit._id} value={habit._id}>{habit.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5} sx={{mx: 1}}>
                        <FormControl variant='filled' fullWidth size="small">
                            <InputLabel>Visbility</InputLabel>
                            <Select name="visibility" value={form.visibility} label="Visibility" required onChange={handleChange}>
                                <MenuItem value={"Private"}>Private</MenuItem>
                                <MenuItem value={"Partner"}>Partner</MenuItem>
                                <MenuItem value={"Public"}>Public</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5} sx={{mx: 1}}>
                        <FileBase64
                            type="file"
                            multiple={false}
                            onDone={({base64}) => setForm({...form, selectedFile: base64})}
                        />
                    </Grid> 
                    <Box sx={{maxHeight: "100px", overflow: "auto", mx: 1}}>
                        <Grid item xs={12} sx={{mx: 1}}>
                            <img src={form.selectedFile} style={{maxWidth: "450px"}}/>
                        </Grid>
                    </Box>
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

export default PostEditor;
