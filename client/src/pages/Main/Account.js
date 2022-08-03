import React from 'react';
import { Container, Box, Grid, Typography, Button } from '@mui/material';

import MainAppBar from '../../components/AppBar/MainAppBar';
import UserInfo from '../../components/UserInfo/UserInfo';
import ProfileEditor from '../../components/Profile/ProfileEditor';
import PartnerTile from '../../components/User/PartnerTile';
import RequestTile from '../../components/User/RequestTile';

const Account = () => {
    return (
        <Container xs={12} maxWidth={false} style={{ margin: 0, padding: 0, backgroundColor: 'inherit'}}>
            <MainAppBar title="Account"/>
            <Grid container>
                <ProfileEditor/>
                <Grid item xs={12} lg={5} sx={{m: 0, p: 0}}>
                    <PartnerTile/>
                    <RequestTile/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Account;