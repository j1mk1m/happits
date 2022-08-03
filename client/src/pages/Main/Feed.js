import React, { useEffect } from "react";
import { Container, Box, Grid, Typography, Button } from '@mui/material';

import { useDispatch, useSelector } from "react-redux";

import MainAppBar from '../../components/AppBar/MainAppBar';
import FeedActivity from '../../components/Feed/FeedActivity';
import PartnerTile from '../../components/User/PartnerTile';
import RequestTile from '../../components/User/RequestTile';

const Feed = () => {
    const habits = useSelector((state) => state.feed.habits);
    const logs = useSelector((state) => state.feed.logs);
    const posts = useSelector((state) => state.feed.posts);

    return (
        <Container xs={12} maxWidth={false} style={{ margin: 0, padding: 0, backgroundColor: 'inherit'}}>
            <MainAppBar title="Feed"/>
            <Grid container>
                <FeedActivity habits={habits} logs={logs} posts={posts}/>
                <Grid item xs={12} lg={5} sx={{m: 0, p: 0}}>
                    <PartnerTile/>
                    <RequestTile/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Feed;