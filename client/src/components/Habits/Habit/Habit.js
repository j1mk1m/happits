import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Container, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import { Popup } from 'reactjs-popup';

import HabitEditor from "../HabitEditor";
import LogEditor from "../../Log/LogEditor";
import HabitView from "../HabitView";

import { archiveHabit } from "../../../actions/habits";

const Habit = (props) => {
    const isDateInThisWeek = (date) => {
        const todayObj = new Date();
        const todayDate = todayObj.getDate();
        const todayDay = todayObj.getDay();
      
        const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
        firstDayOfWeek.setHours(0, 0, 0, 0);
      
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 7);
        lastDayOfWeek.setHours(0, 0, 0, 0);
      
        return date >= firstDayOfWeek && date < lastDayOfWeek;
    }
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [viewOpen, setViewOpen] = React.useState(false);
    const [log, setLog] = React.useState(false);
    const [success, setSuccess] = React.useState(null);
    const today = new Date();
    const logs = useSelector((state) => state.logs);
    const [logData, setLogData] = React.useState({totalSuccess: 0, totalFailure: 0, totalLog: 0, todayLog: 0, weekLog: 0, monthLog: 0, weekData: [0, 0, 0, 0, 0, 0, 0]});
    useEffect(() => {
        let totalSuccess = 0, totalFailure = 0, totalLog = 0, todayLog = 0, weekLog = 0, monthLog = 0;
        let weekData = [0, 0, 0, 0, 0, 0, 0]
        for (let log of logs) {
            if (log.habit._id !== props.habit._id) {
                continue;
            }
            const logDate = new Date(log.date);
            if (log.outcome === "Success") {
                totalSuccess++;
            } else {
                totalFailure++;
            }
            totalLog += log.number;
            if (today.getDate() === logDate.getDate() && today.getMonth() === logDate.getMonth() && today.getFullYear() === logDate.getFullYear()){
                todayLog += log.number;
            }
            if (isDateInThisWeek(logDate)) {
                weekLog += log.number;
                weekData[logDate.getDay()] += log.number;
            }
            if (logDate.getMonth() === today.getMonth() && logDate.getFullYear() === today.getFullYear()){
                monthLog += log.number;
            }
        }
        setLogData({
            totalSuccess, totalFailure, totalLog, todayLog, weekLog, monthLog, weekData
        });    
    }, [logs]);
    const goalAchieved = (props.habit.goal.per === "Daily" && logData.todayLog >= props.habit.goal.number) || (props.habit.goal.per === "Weekly" && logData.weekLog >= props.habit.goal.number) || (props.habit.goal.per === "Monthly" && logData.monthLog >= props.habit.goal.number);

    
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLog = () => {
        setAnchorEl(null);
        setLog(true);
        setOpen(true);
    }
    const handleEdit = () => {
        setAnchorEl(null);
        setLog(false);
        setOpen(true);
    }
    const handleArchive = () => {
        setAnchorEl(null);
        dispatch(archiveHabit(props.habit._id));
    }
    const closeModal = () => {
        setOpen(false);
        setViewOpen(false);
    }

    return (
        <Container style={{padding: 0}} sx={{ bgcolor: goalAchieved ? "#C2F9BB" : "#e6e3e3", border: "solid black 2px", my: "5px", borderRadius: "5px"}}>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                {props.habit.visibility === "Private" ? <PersonIcon sx={{ mx: 1 }} title="Private"/> : 
                (props.habit.visibility === "Partner" ? <PeopleIcon sx={{ mx: 1 }}/> : 
                <PublicIcon sx={{ mx: 1 }}/>)}
                <Button onClick={() => {setViewOpen(true);}} style={{textTransform: "none"}} sx={{ mx: 1, display: 'flex', flexGrow: 1, justifyContent: "left" }}><Typography sx={{color: "black"}}>{props.habit.name}</Typography></Button>
                
                <IconButton onClick={() => {setSuccess("Success"); handleLog();}} sx={{display: 'flex'}}> <CheckIcon/> </IconButton>
                <IconButton onClick={() => {setSuccess("Failure"); handleLog();}} sx={{display: 'flex'}}> <NotInterestedIcon/> </IconButton>
                <IconButton sx={{display: 'flex'}} onClick={handleClick}> <MoreVertIcon/> </IconButton>
                <Menu id="habit-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleLog}>Log</MenuItem>
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleArchive}>Archive</MenuItem>
                </Menu>
            </Box>
            <Popup open={open} onClose={closeModal} modal nested>
                {!log? 
                    <HabitEditor id={props.habit._id} close={closeModal} form={props.habit}/>
                    :
                    (<LogEditor close={closeModal} habit={props.habit} outcome={success}/>)
                }
            </Popup>
            <Popup open={viewOpen} onClose={closeModal} modal nested>
                <HabitView habit={props.habit} logData={logData} goalAchieved={goalAchieved} />
            </Popup>
        </Container>
    );
};

export default Habit;