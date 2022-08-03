import { Box, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Partner from "./Partner";

const PartnerTile = () => {
    const user = useSelector((state) => state.user);
    const {partners} = user;

    return (
        <Paper elevation={5} sx={{m: 1, p: 2, borderRadius: '10px', height: "300px"}}>
        <Typography variant='h6'>Partners</Typography>
        <Box component='div' sx={{ display: "flex", flexDirection: "column", height: "250px", overflow: "auto"}}>
            {partners.length > 0 ? partners.map((partner) => (
                <Partner key={partner._id} user={partner}/>
            )) : 
            <Box sx={{display: "flex", height: "250px", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="p">You do not have any partners</Typography>                    
                </Box>}
        </Box>
        </Paper>
    );
}

export default PartnerTile;