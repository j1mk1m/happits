import React, { useEffect, useState } from "react";
import { useDispatch, useStore, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Container, ThemeProvider } from "@mui/material";

import Main from "./pages/Main.js";
import Login from "./pages/Auth.js";

import { theme } from "./styles.js";

const App = () => {
    const dispatch = useDispatch();
    const store = useStore();
    const userSelector = useSelector((state) => state.auth);
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));

    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem('auth')));
    }, [userSelector]);

    return (
        <Router> <ThemeProvider theme={theme}>
            <Container maxWidth={false} style={{padding: 0}}>
                {!auth ? <Login/> : <Main/> }
                {/* <Main/> */}
            </Container>
        </ThemeProvider> </Router>
    )
}

export default App;
