import React, {  } from 'react';
import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import HospitalCard from '../../../components/HospitalCard';
import SkeletonCards from '../../../components/SkeletonCards';

interface FeaturedHospitalsSectionProps {
  featuredHospitals: any;
  isLoading: boolean
}

const FeaturedHospitalsSection: React.FC<FeaturedHospitalsSectionProps> = ({ featuredHospitals,isLoading }) => {


  return (
    <Box w="100%" m={0} p={0} py={12} bg="white">
      <Container maxW={"6xl"}>
        <Heading as="h2" size="lg" mb={4}>
          Hôpitaux en vedette
        </Heading>
        {isLoading ? (
          <SkeletonCards/>
          ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {featuredHospitals.map((hospital:any) => (
            <HospitalCard key={hospital.created_at} hospital={hospital} />
          ))}
        </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default FeaturedHospitalsSection;
