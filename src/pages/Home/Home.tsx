// Home.tsx
import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const Home: React.FC = () => {
  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Bienvenue sur notre plateforme de prise de rendez-vous médicaux !
      </Heading>
    </Box>
  );
};

export default Home;
