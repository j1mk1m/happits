import React from "react";
import { Box, Typography, Button, Grid, IconButton, Toolbar, Paper, Divider } from '@mui/material';

import { BarGraph } from "./BarGraph";

import HeatMap from "./HeatMap";
import WeekTable from "./Table";
import { useSelector } from "react-redux";

const Analytics = () => {
    const logs = useSelector((state) => state.logs);
    return (
        <Grid item xs={12} lg={7} sx={{m: 0}}>
            <Paper elevation={5} sx={{m: 1, px: 2, pt: 1, pb: 2, borderRadius: '10px', maxHeight: "300px", overflow: "auto"}}>
                <Typography variant="h6">Analytics</Typography>
                <Typography varaint="subtitle1" sx={{width: "100%", textAlign: "center"}}>Heat Map</Typography>
                <HeatMap data={logs}/>
                <Divider/>
                <Typography varaint="subtitle1" sx={{width: "100%", textAlign: "center"}}>This Week's Log</Typography>
                <WeekTable/>
                
            </Paper>
        </Grid>
    );
}

export default Analytics;