import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import SideNavBar from "../components/AppBar/SideNavBar";
import { Container, BottomNavigation, Typography } from "@mui/material";


import Dashboard from "./Main/Dashboard.js";
import Account from "./Main/Account";
import Explore from "./Main/Explore";
import Groups from "./Main/Groups";
import Feed from "./Main/Feed";
import HabitPage from "./Views/Habit";
import Profile from "./Main/Profile";

import { getUserInfo } from '../actions/user';
import { getHabits } from '../actions/habits';
import { getLogs } from '../actions/logs';
import { getPosts } from '../actions/posts';
import { getAllUsers } from '../actions/explore';
import { getExplore } from '../actions/explore';
import { getFeed } from '../actions/feed.js';


const Main = () => {
    const dispatch = useDispatch();
    const auth = JSON.parse(localStorage.getItem('auth'));
   
    useEffect(() => {
        if (auth) {
            dispatch(getUserInfo());
            dispatch(getHabits());
            dispatch(getLogs());
            dispatch(getPosts());
            dispatch(getAllUsers());
            dispatch(getExplore());
            dispatch(getFeed());
        }
    }, []);
    return (
        <Container maxWidth={false} style={{padding: 0, backgroundColor: "#EDECF5"}} sx={{display: "flex"}}> 
            <SideNavBar/>
            <Container style={{padding: 0, margin: 0}}>
                <Routes>
                    <Route path='/' element={<Dashboard/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/habit' element={<HabitPage/>}/>
                    <Route path='/profile/:id' element={<Profile/>}/>
                    <Route path='/explore' element={<Explore/>}/>
                    <Route path='/feed' element={<Feed/>}/>
                    <Route path='/groups' element={<Groups/>}/>
                    <Route path='/account' element={<Account/>}/>
                </Routes>
                <BottomNavigation sx={{my: 1}}>
                    <Typography>
                        This habit tracker application is an open source project that can be found on github: link
                    </Typography>
                </BottomNavigation>
            </Container>   
        </Container>
    )
}

export default Main;