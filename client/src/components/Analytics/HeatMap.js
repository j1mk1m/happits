import React from "react";
import { Box, Typography, Button, Grid, IconButton, Toolbar, Paper } from '@mui/material';

import Calendar from 'react-github-contribution-calendar';


const HeatMap = ({data}) => {
    let values = {}
    for (let log of data) {
        let key = log.date.toString().substring(0, 10);
        values[key] = values[key] ? values[key] + 1: 1;
    }
    var until = new Date().toString();
    return (<Calendar values={values} until={until}/>)
}

export default HeatMap;