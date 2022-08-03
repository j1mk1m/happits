import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import BalanceRoundedIcon from '@mui/icons-material/BalanceRounded';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

const pages = ["Dashboard", "Feed", "Explore", "Groups"]
const settings = ["Profile", "Settings"]

const AppBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleLogout = () => {
        dispatch({type: 'auth/LOGOUT'});
        navigate('/');
    }
  
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = jwt_decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch({type: 'auth/LOGOUT'});
                navigate('/');
            }
          }
    }, [user, anchorElNav, anchorElUser]);

    return (
      <AppBar position="static">
        <Container maxWidth="xl" sx={{my: 0, mx: 0, px: 1, py: 1}}>
          <Toolbar disableGutters>
            <BalanceRoundedIcon sx={{ display: {xs: 'none', md: 'flex'}, mr: 1}}></BalanceRoundedIcon>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Happits
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
              {pages.map((page) => (
                <Button component={Link} to={"/"+page}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: '#000000', display: 'block', fontFamily: 'monospace',
                  fontWeight: 400 }}
                >
                  {page}
                </Button>
              ))}
            </Box>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem component={Link} to={"/"+page} key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" sx={{fontFamily: 'monospace',
                  fontWeight: 400}}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            
            <BalanceRoundedIcon sx={{ display: {xs: 'flex', md: 'none'}, mr: 1}}></BalanceRoundedIcon>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to='/'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Happits
            </Typography>
  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: '#7da453' }}><SettingsIcon/></Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem component={Link} to={'/' + setting} key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                <MenuItem key="logout" onClick={handleLogout}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  };
  export default AppBar;