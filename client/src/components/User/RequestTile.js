import { Box, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import Request from "./Request";

const RequestTile = () => {
    const user = useSelector((state) => state.user);
    const {requests} = user;

    return (
        <Paper elevation={5} sx={{m: 1, p: 2, borderRadius: '10px', height: "300px"}}>
        <Typography variant='h6'>Requests</Typography>
        <Box component='div' sx={{ display: "flex", flexDirection: "column", height: "250px", overflow: "auto"}}>
            {requests.length > 0 ? requests.map((request) => (
                <Request key={request._id} user={request}/>
            )) : 
            <Box sx={{display: "flex", height: "250px", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="p">You do not have any requests</Typography>                    
            </Box>}
        </Box>
        </Paper>
    );
}

export default RequestTile;