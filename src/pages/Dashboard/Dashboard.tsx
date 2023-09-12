import React from 'react';
import { Box } from '@chakra-ui/react';
import Profile from './DashboardComponents/Profile';

const Dashboard = () => {

  return (
    <Box p={2} mt={20}>
      <Profile/>
    </Box>
  );
};

export default Dashboard;


