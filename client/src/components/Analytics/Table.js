import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const isDateInThisWeek = (date) => {
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();
  
    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
    firstDayOfWeek.setHours(0, 0, 0, 0);
  
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 7);
    lastDayOfWeek.setHours(0, 0, 0, 0);
  
    return date >= firstDayOfWeek && date < lastDayOfWeek;
}

const WeekTable = () => {
    const logs = useSelector((state) => state.logs);
    const habits = useSelector((state) => state.habits);
    let datasets = [];
    for (let habit of habits) {
        let weekData = [0, 0, 0, 0, 0, 0, 0]
        for (let log of logs.filter((log) => log.habit._id === habit._id)) {
            const dateObj = new Date(log.date);
            if (isDateInThisWeek(dateObj)){
                const day = dateObj.getDay();
                weekData[day] += log.number;
            }
        }
        datasets.push({
            name: habit.name + " (" + habit.goal.times + ")", 
            data: weekData
        });
    }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Habit</StyledTableCell>
            <StyledTableCell align="right">Sun</StyledTableCell>
            <StyledTableCell align="right">Mon</StyledTableCell>
            <StyledTableCell align="right">Tue</StyledTableCell>
            <StyledTableCell align="right">Wed</StyledTableCell>
            <StyledTableCell align="right">Thu</StyledTableCell>
            <StyledTableCell align="right">Fri</StyledTableCell>
            <StyledTableCell align="right">Sat</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datasets.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              {row.data.map((point, index) => (
                <StyledTableCell key={index} align="right">{point}</StyledTableCell>

              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WeekTable;
