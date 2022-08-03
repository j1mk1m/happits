import React from "react";
import { Container, Box, Card, Typography, Button, Grid, Avatar, IconButton, Toolbar, Paper, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate, Link } from "react-router-dom";

import { useSelector } from 'react-redux';
import InfoTile from "./InfoTile";

const UserInfo = ({profile}) => {
    let user = useSelector((state) => state.user);
    let habits = useSelector((state) => state.habits);
    const logs = useSelector((state) => state.logs);
    let posts = useSelector((state) => state.posts);
    let mutuals = 0;
    const imageSize = "200px";
    if (profile) {
        mutuals = profile.user?.partners?.filter((p) => user.partners.includes(p)).length;
        user = profile.user;
        habits = profile.habits;
        posts = profile.posts;
    }
    const score = user?.partners?.length * 10 + habits?.length * 10 + posts?.length * 10 + logs?.length;

    return (
        <Grid item xs={12} lg={5} sx={{m: 0, p: 0}}>
            <Paper elevation={5} sx={{m: 1, px: 2, pt: 1, pb: 2, borderRadius: '10px', minHeight: "300px"}}>
                <Container disableGutters>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <Typography variant="h6" sx={{flexGrow: 1}}>{profile? user.username + "'s Info" : "My Info"}</Typography>
                    {!profile && <Link to="/account" style={{textDecoration: "none"}}>Edit</Link>}
                </Box>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Box sx={{display: "flex", flexDirection: "column", mr: 2}}>
                        <Avatar alt={user.username} src={user.profileImage} sx={{width: imageSize, height: imageSize}}/>
                        <Typography variant="subtitle1" sx={{textAlign: "center"}}>{user?.name}</Typography>
                        <Typography variant="subtitle2" sx={{textAlign: "center"}}>{user?.username}</Typography>
                    </Box>
                    <Grid container>
                        <InfoTile text={"Partners"} number={user?.partners?.length} size={6}/>
                        {profile? <InfoTile text={"Mutuals"} number={mutuals} size={6}/>
                        : <InfoTile text={"Requests"} number={user?.requests?.length} size={6}/>}
                        <InfoTile text={"Habits"} number={habits?.length} size={6}/>
                        <InfoTile text={"Posts"} number={posts?.length} size={6}/>
                        {!profile && 
                        <>
                            <InfoTile text={"Success Logs"} number={logs?.filter((log) => log.outcome === "Success").length} size={6}/>
                            <InfoTile text={"Failure Logs"} number={logs?.filter((log) => log.outcome === "Failure").length} size={6}/>
                        </>}
                        <Grid item xs={12}>
                            <Card elevation={5} sx={{m: "4px", p: "4px", borderRadius: '5px'}}>
                            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                <Typography variant="body2" sx={{textAlign: "center"}}>Happits Score</Typography>
                                <Typography variant="body1" sx={{textAlign: "center"}}>{score}</Typography>
                            </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
                </Container>
            </Paper>
        </Grid>
    );
};

export default UserInfo;