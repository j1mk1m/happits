import React from "react";
import { Container,Card, Box, Typography, Button, Grid, Avatar, IconButton, Toolbar, Paper, List, ListItem, ListItemText } from '@mui/material';

const InfoTile = ({text, number, size}) => {
    return (
        <Grid item xs={size} sx={{m: 0, p: 0}}>
            <Card elevation={5} sx={{m: "4px", p: "4px", borderRadius: '5px'}}>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <Typography variant="body1" sx={{textAlign: "center"}}>{number}</Typography>
                    <Typography variant="body2" sx={{textAlign: "center"}}>{text}</Typography>
                </Box>
            </Card>
        </Grid>
    );
};

export default InfoTile;