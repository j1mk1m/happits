import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase64 from 'react-file-base64';

import { Box, Paper, Grid, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Button} from '@mui/material';

import { createPost, updatePost } from '../../actions/posts';

const PostView = (props) => {

    return (
        <Paper elevation={5} sx={{width: "500px", borderRadius: "15px"}}>
            <Grid container spacing={2} >
                <Grid item xs={12} sx={{mx: 1}}>
                    <Typography variant="h6" sx={{textAlign: "center"}}>Post View</Typography>
                </Grid>
                <Grid item xs={12} sx={{mx: 1}}>
                </Grid>
                <Grid item xs={12} sx={{mx: 1}}>
                </Grid>
                
                
                
                
            </Grid>
        </Paper>
    )
}

export default PostView;
