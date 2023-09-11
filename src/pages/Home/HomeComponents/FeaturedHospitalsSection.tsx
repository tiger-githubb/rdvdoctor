import React, { useState, useEffect } from 'react';
import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import HospitalCard from '../../../components/HospitalCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../services/firebase';

interface HospitalData {
  createdByUserId: string;
  name: string;
  address: string;
  phone_number: string;
  hospital_image: string;
}

const FeaturedHospitalsSection: React.FC = () => {
  const [featuredHospitals, setFeaturedHospitals] = useState<HospitalData[]>([]);

  const fetchFeaturedHospitals = async () => {
    try {
      const hospitalsCollectionRef = collection(db, 'hospitals');
      const hospitalsSnapshot = await getDocs(hospitalsCollectionRef);

      const hospitalsDataArray: HospitalData[] = [];
      hospitalsSnapshot.forEach((doc) => {
        const hospitalData = doc.data();
        hospitalsDataArray.push(hospitalData as HospitalData);
      });

      setFeaturedHospitals(hospitalsDataArray);
    } catch (error) {
      console.error('Une erreur est survenue :', error);
    }
  };

  useEffect(() => {
    fetchFeaturedHospitals();
  }, []);

  return (
    <Box w="100%" m={0} p={0} py={12} bg="white">
      <Container maxW={"6xl"}>
        <Heading as="h2" size="lg" mb={4}>
          Hôpitaux en vedette
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {featuredHospitals.map((hospital) => (
            <HospitalCard key={hospital.createdByUserId} hospital={hospital} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default FeaturedHospitalsSection;
