import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import DeleteIcon from '@mui/icons-material/Delete';
import { Popup } from 'reactjs-popup';


import LogEditor from "../LogEditor";

import { archiveLog } from "../../../actions/logs";

const LogRecord = ({log}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    
    const closeModal = () => {
        setOpen(false);
    }
    const handleEdit = () => {
        setOpen(true);
    }
    const handleArchive = () => {
        dispatch(archiveLog(log._id));
    }

    return (
        <Container style={{padding: 0}} sx={{ bgcolor: log.outcome === 'Success'? "#C2F9BB" : "#FF6666", border: "solid black 2px", my: "5px", borderRadius: "5px"}}>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", mx: 1}}>
                {log.outcome === 'Success'? <CheckIcon/> : <NotInterestedIcon/>}
                <Typography sx={{ ml: 1, flexGrow: 1}}>{log.habit.name}</Typography>
                <IconButton onClick={handleEdit}><EditIcon/></IconButton>
                <IconButton onClick={handleArchive}><DeleteIcon/></IconButton>
            </Box>
            <Popup open={open} onClose={closeModal} modal nested>
                <LogEditor id={log._id} close={closeModal} form={log}/>
            </Popup>
        </Container>
    );
}

export default LogRecord;