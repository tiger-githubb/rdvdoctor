import React, { useState, useEffect }  from 'react';
import { Flex, Heading, SimpleGrid,Container } from '@chakra-ui/react';
import ProfesionalCard from '../../components/ProfesionalCard';
import { collection } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';

export interface ProfessionalData {
  uid: string;
  role: number;
  phone_number: string;
  address: string;
  email: string;
  date_of_birth: string;
  description?: string;
  displayName: string;
  profile_image: string;
  speciality?: string;
}

const ProfessionalsPage: React.FC = () => {

  const [professionalsData, setProfessionalsData] = useState<ProfessionalData[]>([]);

  const fetchProfessionalData = async () => {
    try {
      const professionalCollectionRef = collection(db, "users");
      const professionalsSnapshot = await getDocs(professionalCollectionRef);

      const professionalsDataArray: ProfessionalData[] = [];
      professionalsSnapshot.forEach((doc) => {
        const professionalData = doc.data();
        professionalsDataArray.push(professionalData as ProfessionalData);
      });
      setProfessionalsData(professionalsDataArray);

    } catch (error) {
      console.log("un probleme est survenu :", error);
    }
  }

  useEffect(() => {
    fetchProfessionalData();
  }, []);
 

  return (
    <Container maxW="container.xl" mt={8}>
      <Flex justify="center" align="center" direction="column">
        <Heading as="h1" mb={4}>
          Liste des Professionnels
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {professionalsData.map((professional) => (
        <ProfesionalCard key={professional.uid} professional={professional} />
      ))}
        </SimpleGrid>
      </Flex>
    </Container>
  );
};

export default ProfessionalsPage;
