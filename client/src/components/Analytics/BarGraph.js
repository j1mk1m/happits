import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import randomColor from 'randomcolor';

  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);  
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
  
export const BarGraph =  ({name, weekData}) => {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: "This week's logs",
          },
        },
      };
      const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      let data = {
        labels,
        datasets: [{label: name, data: weekData, backgroundColor: randomColor() }]
      };
    return (<Bar options={options} data={data} />);
}
  

// const logs = useSelector((state) => state.logs);
//     const habits = useSelector((state) => state.habits);
//     let datasets = [];
//     for (let habit of habits) {
//         let weekData = [0, 0, 0, 0, 0, 0, 0]
//         for (let log of logs.filter((log) => log.habit._id === habit._id)) {
//             const dateObj = new Date(log.date);
//             if (isDateInThisWeek(dateObj)){
//                 const day = dateObj.getDay();
//                 weekData[day] += 1;
//             }
//         }
//         datasets.push({
//             label: habit.name, 
//             data: weekData,
//             backgroundColor: randomColor()
//         });
//     }
//     const options = {
//         responsive: true,
//         plugins: {
//           legend: {
//             position: 'bottom',
//           },
//           title: {
//             display: true,
//             text: "This week's Logs",
//           },
//         },
//       };
//       const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//       let data = {
//         labels,
//         datasets
//       };