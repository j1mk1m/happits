import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Grid, Paper } from '@mui/material';

import UserTile from "./UserTile";

const Browse = () => {
    const users = useSelector((state) => state.explore.users);

    return (
        <Grid item xs={12} lg={5} sx={{m: 0, p: 0}}>
            <Paper elevation={5} sx={{m: 1, px: 2, pt: 1, pb: 2, borderRadius: '10px', minHeight: "300px"}}>
                <Typography variant='h6'>Browse Users</Typography>
                {users.map((user) => (
                    <UserTile key={user._id} user={user}/>
                ))}
            </Paper>
        </Grid>
    );
};

export default Browse;