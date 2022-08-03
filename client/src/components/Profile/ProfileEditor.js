import React, { useEffect } from "react";
import { Container, Box, Typography, Grid, Divider, IconButton, InputAdornment, Avatar, Toolbar, Paper, List, ListItem, ListItemText, TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { getUserInfo, updateUser } from "../../actions/user";
import { resetPassword } from "../../actions/auth";
import FileBase64 from 'react-file-base64';


import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ProfileEditor = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [form, setForm] = React.useState({name: user.name, username: user.username, email: user.email});
    const [password, setPassword] = React.useState({oldPassword: "", newPassword: ""})
    const [settings, setSettings] = React.useState(null);
    const [showPasswordOld, setShowPasswordOld] = React.useState(false);
    const [showPasswordNew, setShowPasswordNew] = React.useState(false);
    const [profileImage, setProfileImage] = React.useState(user.profileImage);
    const imageSize = "200px";

    const handleShowPasswordOld = () => {
        setShowPasswordOld((prevShowPassword) => !prevShowPassword);
    }
    const handleShowPasswordNew = () => {
        setShowPasswordNew((prevShowPassword) => !prevShowPassword);
    }

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        dispatch(updateUser(user._id, form));
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setPassword({
            ...password, [name]: value
        })
    }

    const handleReset = (e) => {
        dispatch(resetPassword(password));
    }
    const handleProfileChange = ({base64}) => {
        setProfileImage(base64)
        dispatch(updateUser(user._id, {profileImage}));
    }
    useEffect(() => {
        if (user.username === "") {
            dispatch(getUserInfo());
        }
        if (form.name === "") {
            setForm({name: user.name, username: user.username, email: user.email});
        }
        setProfileImage(user.profileImage);
    }, [user]);

    return (
        <Grid item xs={12} lg={7} sx={{m: 0, p: 0}}>
            <Paper elevation={5} sx={{m: 1, p: 2, borderRadius: '10px'}}>
                <Typography variant='h6'>Edit Profile</Typography>
                <Avatar alt={user.username} src={profileImage} sx={{width: imageSize, height: imageSize, mr: 2, my: 1}}/>
                <FileBase64
                    type="file"
                    multiple={false}
                    onDone={handleProfileChange} style={{my: 1}}/>
                <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{mx: 1}}>
                        <TextField name="name" label="Name" value={form.name} onChange={handleChange} variant="filled" fullWidth/>
                    </Grid>
                    <Grid item xs={12} sx={{mx: 1}}>
                        <TextField name="username" label="Username" value={form.username} onChange={handleChange} variant="filled" fullWidth/>
                    </Grid>
                    <Grid item xs={12} sx={{mx: 1}}>
                        <TextField name="email" label="Email" value={form.email} onChange={handleChange} variant="filled" fullWidth/>
                    </Grid>   
                </Grid>
                <Button type="submit">Update</Button>
                </form>
                <Divider/>
                <form onSubmit={handleReset}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{mx: 1}}>
                            <Typography>Reset Password</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{mx: 1}}>
                            <TextField name="oldPassword" label="Old Password" onChange={handlePasswordChange} variant="filled" type={showPasswordOld? "text" : "password"}  required fullWidth InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPasswordOld}>
                                    {showPasswordOld ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>)}} 
                            />
                        </Grid>  
                        <Grid item xs={12} sx={{mx: 1}}>
                            <TextField name="newPassword" label="New Password" onChange={handlePasswordChange} variant="filled" type={showPasswordNew? "text" : "password"} required fullWidth InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPasswordNew}>
                                    {showPasswordNew ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                )}} 
                            />
                        </Grid>  
                    </Grid>
                    <Button type='submit'>Reset Password</Button>
                </form>
                {/* <Divider/>
                <Typography variant='h6'>Settings</Typography>
                <Typography>Notification settings?</Typography> */}
            </Paper>
        </Grid>
    );
}

export default ProfileEditor;