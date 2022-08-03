import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Typography, Button, Toolbar } from '@mui/material';
import UserInfo from '../../components/UserInfo/UserInfo';
import Habits from '../../components/Habits/Habits';
import Posts from '../../components/Posts/Posts';
import Log from '../../components/Log/Log';
import Analytics from '../../components/Analytics/Analytics';
import { useDispatch, useSelector } from 'react-redux';

import MainAppBar from '../../components/AppBar/MainAppBar';

const Dashboard = () => {

    return (
        <Container xs={12} maxWidth={false} style={{ margin: 0, padding: 0, backgroundColor: 'inherit'}}>
            <MainAppBar title="Dashboard"/>
            <Grid container>
                <UserInfo/>
                <Analytics/>
                <Habits/>
                <Log/>
                <Posts/>
            </Grid>
        </Container>
    );
}

export default Dashboard;