import React from 'react';

import { Flex, Box, Heading, SimpleGrid,Container } from '@chakra-ui/react';
import ProfesionalCard from '../../components/ProfesionalCard';

import { professionalsData } from '../../services/professionalData';

const ProfessionalsPage = () => {
 

  return (
    <Container maxW="container.xl" mt={8}>
      <Flex justify="center" align="center" direction="column">
        <Heading as="h1" mb={4}>
          Liste des Professionnels
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {professionalsData.map((professional) => (
        <ProfesionalCard key={professional.id} professional={professional} />
      ))}
        </SimpleGrid>
      </Flex>
    </Container>
  );
};

export default ProfessionalsPage;
