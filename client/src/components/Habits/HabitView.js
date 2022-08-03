import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Paper, Grid, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Button, Divider} from '@mui/material';
import { getLogsByHabit } from '../../actions/habits';

import { BarGraph } from '../Analytics/BarGraph';

import InfoTile from '../UserInfo/InfoTile';


const HabitView = ({habit, logData, goalAchieved}) => {
    const totalSuccess = logData?.totalSuccess;
    const totalFailure = logData?.totalFailure;
    const totalLog = logData?.totalLog;
    const todayLog = logData?.todayLog;
    const weekLog = logData?.weekLog;
    const monthLog = logData?.monthLog;
    const weekData = logData?.weekData;

    return (
        <Paper elevation={5} sx={{width: "500px", borderRadius: "15px"}}>
            <Grid container spacing={1}>
                <Grid item xs={12} sx={{mx: 1}}>
                    <Typography variant="h6" sx={{textAlign: "center"}}>{habit.name}</Typography>
                </Grid>
                {logData && <Grid item xs={12} sx={{mx: 1, textAlign: 'center'}}>
                    {goalAchieved ? "Congrats, you achieved your goal!" : "You have not achieved your goal yet."}
                </Grid>}
                <Grid item xs={12} sx={{mx: 1}}>
                    <Typography variant="p" sx={{textAlign: "center"}}>{"Description: " + habit.description}</Typography>
                </Grid>
                <Grid item xs={12} sx={{mx: 1}}>
                    <Typography variant="p" sx={{textAlign: "center"}}>{"Supporters: " + habit.supporters.length}</Typography>
                </Grid>
                <Grid item xs={12} sx={{mx: 1}}>
                    <Typography variant="p" sx={{textAlign: "center"}}>{"Created At: " + new Date(habit.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</Typography>
                </Grid>
                <Grid item xs={12} sx={{mx: 1}}>
                    <Typography variant="p" sx={{textAlign: "center"}}>{"Visibility: " + habit.visibility}</Typography>
                </Grid>
                <Grid item xs={12} sx={{mx: 1}}>
                    <Typography variant="p" sx={{textAlign: "center"}}>{"Goal: " + habit.goal.number + " " + habit.goal.times + " " + habit.goal.per}</Typography>
                </Grid>
                <Divider/>
                {logData && <>
                <Grid item xs={12} sx={{mx: 1}}>
                    <Typography variant="h6" sx={{textAlign: "center"}}>{"Logs"}</Typography>
                </Grid>
                <InfoTile text={"Total Success"} number={totalSuccess} size={4}/>
                <InfoTile text={"Total Failure"} number={totalFailure} size={4}/>
                <InfoTile text={"Total " + habit.goal.times} number={totalLog} size={4}/>
                <InfoTile text={"Today"} number={todayLog} size={4}/>
                <InfoTile text={"This week"} number={weekLog} size={4}/>
                <InfoTile text={"This month"} number={monthLog} size={4}/>
                
                <Grid item xs={12} sx={{mx: 1}}>
                    <BarGraph name={habit.name} weekData={weekData}/>
                </Grid>
                </>}
            </Grid>
        </Paper>
    );
}

export default HabitView;