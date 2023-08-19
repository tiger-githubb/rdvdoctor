import React from 'react';
import { Box, SimpleGrid, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

interface StatsOverviewProps {
  appointmentsCount: number;
  patientsCount: number;
  earnings: number;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ appointmentsCount, patientsCount, earnings }) => {
  return (
    <Box p={4} bg="white" borderRadius="lg" boxShadow="md">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        <Stat>
          <StatLabel>Rendez-vous</StatLabel>
          <StatNumber>{appointmentsCount}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Patients</StatLabel>
          <StatNumber>{patientsCount}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Gains</StatLabel>
          <StatNumber>${earnings}</StatNumber>
        </Stat>
      </SimpleGrid>
    </Box>
  );
};

export default StatsOverview;
