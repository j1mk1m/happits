import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Box, TextField, Typography, Button, Paper} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { login, register } from '../../actions/auth';
import Input from './Input';

const Auth = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const errorMessage = useSelector((state) => state.auth.errorMessage);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [form, setForm] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        confirmPassword: ""
    });
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
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
        e.preventDefault();
        if (isSignup) {
            dispatch(register(form));
        } else {
            dispatch(login(form));
        }
    }
    return (
        <Container maxWidth="xs">
            <Paper elevation={3}>
                <Typography variant='h5' style={{textAlign: "center"}}>
                    Welcome to Happits
                </Typography>
                <Typography variant="h6">{isSignup ? 'Sign Up' : "Log In"}</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup &&
                        <>
                        <Input name="name" label="Name" handleChange={handleChange} type="name" />
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        </>}
                        <Input name="username" label="Username" handleChange={handleChange} type="username" autoFocus={!isSignup} />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained">
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign Up" }
                        </Button>
                        </Grid>
                    </Grid>
                </form>
                {errorMessage && <Typography sx={{color: "red"}}>*{errorMessage}</Typography>}
            </Paper>
        </Container>
    );
}

export default Auth;
