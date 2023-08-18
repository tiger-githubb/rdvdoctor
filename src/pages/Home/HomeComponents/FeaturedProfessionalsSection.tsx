import React from 'react';
import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import ProfesionalCard from '../../../components/ProfesionalCard';
 // Assurez-vous que le chemin est correct

// Exemple de données des professionnels
const featuredProfessionals = [
  {
    id: 1,
    name: 'Dr. Jean Dupont',
    specialty: 'Dentiste',
    avatarUrl: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    name: 'Dr. Marie Martin',
    specialty: 'Gynécologue',
    avatarUrl: 'https://picsum.photos/200',
  },
  // Ajoutez d'autres professionnels ici
];

const FeaturedProfessionalsSection: React.FC = () => {
  return (
    <Box py={8} bg="gray.100">
      <Container maxW="container.xl">
        
        <Heading as="h2" size="lg" mb={4}>
          Professionnels de santé en vedette
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {featuredProfessionals.map((professional) => (
            <ProfesionalCard  key={professional.id} professional={professional} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default FeaturedProfessionalsSection;
