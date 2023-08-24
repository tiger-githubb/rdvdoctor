import React from 'react';
import { Box } from '@chakra-ui/react';
import HeaderDashboard from './DashboardComponents/HeaderDashboard';
import AppointmentsList from './DashboardComponents/AppointmentsList';
import MyCalendar from './DashboardComponents/Calendar';

const Dashboard = () => {
    // const appointments = [
    //     {
    //       id: 1,
    //       patientName: 'John Doe',
    //       date: '2023-08-25 10:00 AM',
    //       reason: 'Checkup',
    //       status: 'Confirmed',
    //     },
    //   ];
   

  return (
    <Box p={4} >
      <HeaderDashboard  />
      <AppointmentsList/>
      <MyCalendar/>

      
    </Box>
  );
};

export default Dashboard;


