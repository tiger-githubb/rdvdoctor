import React from 'react';

import { Flex, Box, Heading, SimpleGrid } from '@chakra-ui/react';
import ProfesionalCard from '../../components/ProfesionalCard';

const ProfessionalsPage = () => {
 

  return (
    <Box p={1}>
      <Flex justify="center" align="center" direction="column">
        <Heading as="h1" mb={4}>
          Liste des Professionnels
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>

        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default ProfessionalsPage;
