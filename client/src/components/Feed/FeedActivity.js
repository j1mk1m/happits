import React from "react";
import { Container, Box, Typography, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

import ActivityItem from "./ActivityItem";

const FeedActivity = ({habits, logs, posts}) => {
    return (
        <Grid item xs={12} lg={7} sx={{m: 0, p: 0}}>
            <Paper elevation={5} sx={{m: 1, p: 2, borderRadius: '10px', height: "640px"}}>
                <Typography variant='h6'>Latest Activity</Typography>
                <Box component='div' sx={{ display: "flex", flexDirection: "row", height: "550px", flexWrap: "wrap", overflow: "auto"}}>
                    {habits?.length > 0 &&
                        habits?.map((item) => <ActivityItem type="Habit" habit key={item._id} item={item}/>)}
                    {logs?.length > 0 && 
                        logs?.map((item) => <ActivityItem type="Log" key={item._id} item={item}/>)}
                    {posts?.length > 0 && 
                        posts?.map((item) => <ActivityItem type="Post" key={item._id} item={item}/>)}
                    {posts?.length + logs?.length + habits?.length == 0 && 
                        <Box sx={{display: "flex", height: "100px", width: "100%", justifyContent: "center", alignItems: "center"}}>
                            <Typography variant="p">No latest activity to show.</Typography>                    
                        </Box>}
                </Box>
            </Paper>
        </Grid>
    )
}

export default FeedActivity;