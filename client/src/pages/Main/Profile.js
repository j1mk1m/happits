import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";



import MainAppBar from '../../components/AppBar/MainAppBar';
import UserInfo from '../../components/UserInfo/UserInfo';
import FeedActivity from '../../components/Feed/FeedActivity';
import Posts from '../../components/Posts/Posts';
import Habits from '../../components/Habits/Habits';

import { getUserProfile } from '../../actions/user';

const Profile = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));
    const MY = auth.user.id === params.id;
    useEffect(() => {
        if (!MY) {
            dispatch(getUserProfile(params.id));
        }
    }, []);
    const profile = useSelector((state) => state.profile);    

    return (
        <Container xs={12} maxWidth={false} style={{ margin: 0, padding: 0, backgroundColor: 'inherit'}}>
            <MainAppBar title={MY? "My Profile" : "Profile"}/>
            <Grid container>
                <UserInfo profile={!MY && profile}/>
                <Habits habitsData={!MY && profile?.habits}/>
                <Posts postsData={!MY && profile?.posts}/>
            </Grid>
        </Container>
    )
}

export default Profile;