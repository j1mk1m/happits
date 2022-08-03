import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Typography, IconButton, Grid, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { Popup } from 'reactjs-popup';
import DatePicker from 'react-date-picker';

import LogRecord from "./LogRecord/LogRecord";
import LogEditor from "./LogEditor";

const Log = () => {
    const logs = useSelector((state) => state.logs);
    const [date, setDate] = useState(new Date());
    const startDate = new Date(new Date(date).setHours(0, 0, 0, 0));
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);


    return (
        <Grid item xs={12} lg={5} sx={{m: 0}}>
            <Paper elevation={5} sx={{m: 1, px: 2, pt: 1, pb: 2, borderRadius: '10px', minHeight: "300px"}}>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <Typography variant="h6" sx={{display: "flex", flexGrow: 1}}>Log</Typography>
                    <DatePicker onChange={setDate} value={date} maxDate={new Date()}></DatePicker>
                    <Popup
                        trigger={open => (<IconButton size="large"><AddIcon/></IconButton>)}
                        modal nested>
                        {close => (<LogEditor date={date} close={close}/>)}
                    </Popup>
                </Box>
                <Box component='div' sx={{ display: "flex", flexDirection: "column", height: "250px", overflow: "auto"}}>
                    {logs.filter((log) => (new Date(log.date) < endDate && new Date(log.date) >= startDate)).length > 0 ?
                        logs.filter((log) => (new Date(log.date) < endDate && new Date(log.date) >= startDate)).map((log) => (
                            <LogRecord key={log._id} log={log}/>
                        )) :
                        <Box sx={{display: "flex", height: "100px", width: "100%", justifyContent: "center", alignItems: "center"}}>
                            <Typography variant="p">There are no logs for this date. Click the add icon to create a new log.</Typography>                    
                        </Box>
                    }
                </Box>
            </Paper>
        </Grid>
    )
}

export default Log;