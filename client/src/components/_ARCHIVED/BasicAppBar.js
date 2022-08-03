import * as React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Grid } from "@mui/material";



const BasicAppBar = () => {

    return (
      <AppBar position="static">
          <Grid container spacing={0} columns={1} alignItems="center" justifyContent="center" direction="column">
        <Container maxWidth="xl" sx={{my: 0, mx: 0, px: 1, py: 1}}>
          <Toolbar disableGutters>
              <Grid container alignItems="center">
            <Typography
              variant="h6" noWrap component="a" href="/"
              sx={{
                mx: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>
              Happits
            </Typography>
            </Grid>
          </Toolbar>
        </Container>
        </Grid>
      </AppBar>
    );
  };
  export default BasicAppBar;