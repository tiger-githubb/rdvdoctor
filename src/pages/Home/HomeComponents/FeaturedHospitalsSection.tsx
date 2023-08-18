import React from 'react';
import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import HospitalCard from '../../../components/HospitalCard';

const featuredHospitals = [
    {
      id: 1,
      name: 'Hôpital Saint-Louis',
      address: 'Paris, France',
      phoneNumber: '01 23 45 67 89',
      imageUrl: 'https://picsum.photos/seed/picsum/200/300',
    },
    {
      id: 2,
      name: 'Hôpital Bellevue',
      address: 'Marseille, France',
      phoneNumber: '04 56 78 90 12',
      imageUrl: 'https://picsum.photos/seed/picsum/200/300',
    },

  ];

  
const FeaturedHospitalsSection: React.FC = () => {
    return (
        <Box py={8} bg="gray.100">
            <Container maxW="container.xl">
                <Heading as="h2" size="lg" mb={4}>
                    Hôpitaux en vedette
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    
                        {featuredHospitals.map((hospital) => (
                            <HospitalCard  key={hospital.id} hospital={hospital} />
                        ))}
                 

                </SimpleGrid>
            </Container>
        </Box>
    );
}

export default FeaturedHospitalsSection;
