import React from 'react';
import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import ProfesionalCard from '../../../components/ProfesionalCard';
import { professionalsData } from '../../../services/professionalData';
 // Assurez-vous que le chemin est correct


const FeaturedProfessionalsSection: React.FC = () => {
  return (
    <Box py={8} bg="gray.100">
      <Container maxW="container.xl">
        
        <Heading as="h2" size="lg" mb={4}>
          Professionnels de santé en vedette
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {professionalsData.map((professional) => (
        <ProfesionalCard key={professional.id} professional={professional} />
      ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default FeaturedProfessionalsSection;
