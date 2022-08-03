import React from 'react';
import { Container, Box, Grid, Typography, Button } from '@mui/material';

import MainAppBar from '../../components/AppBar/MainAppBar';

const Groups = () => {
    return (
        <Container xs={12} maxWidth={false} style={{ margin: 0, padding: 0, backgroundColor: 'inherit'}}>
            <MainAppBar title="Groups"/>
            <Grid container>
                <Grid item xs={12}>
                    <Typography>Group function under development...</Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Groups;