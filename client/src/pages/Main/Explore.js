import React, { useEffect } from 'react';
import { Container, Box, Grid, Typography, Button } from '@mui/material';

import Browse from '../../components/Explore/Browse';
import MainAppBar from '../../components/AppBar/MainAppBar';
import FeedActivity from '../../components/Feed/FeedActivity';

import { useDispatch, useSelector } from "react-redux";

const Explore = () => {
    const habits = useSelector((state) => state.explore.habits);
    const logs = useSelector((state) => state.explore.logs);
    const posts = useSelector((state) => state.explore.posts);

    return (
        <Container xs={12} maxWidth={false} style={{ margin: 0, padding: 0, backgroundColor: 'inherit'}}>
            <MainAppBar title="Explore"/>
            <Grid container>
                <FeedActivity habits={habits} logs={logs} posts={posts}/>
                <Browse/>
            </Grid>
        </Container>
    )
}

export default Explore;