import React, { useState, useEffect } from 'react';
import { Container, SimpleGrid } from '@chakra-ui/react';
import ProfesionalCard from '../../../components/ProfesionalCard';
import { collection } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { getDocs } from 'firebase/firestore';
import SkeletonCards from '../../../components/SkeletonCards';


interface ProfessionalData {
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

const ProfessionalList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [professionalsData, setProfessionalsData] = useState<ProfessionalData[]>([]);

  const fetchProfessionalData = async () => {
    try {
      setIsLoading(true);
      const professionalCollectionRef = collection(db, "users");
      const professionalsSnapshot = await getDocs(professionalCollectionRef);

      const professionalsDataArray: ProfessionalData[] = [];
      professionalsSnapshot.forEach((doc) => {
        const professionalData = doc.data() as ProfessionalData;
        if (professionalData.role === 1 ) {
          professionalsDataArray.push(professionalData);
        }
      });
      setProfessionalsData(professionalsDataArray);
      setIsLoading(false);


    } catch (error) {
      console.log("un probleme est survenu :", error);
    }
  }

  useEffect(() => {
    fetchProfessionalData();
  }, []);

  return (
    <Container maxW={'6xl'} pt={{ base: 10, md: 10 ,lg:10 }}>
      {isLoading ? (
        <>
        <SkeletonCards/>
        <SkeletonCards/>
        </>
        
      ):(
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>

        {professionalsData.map((professional) => (
          <ProfesionalCard key={professional.uid} professional={professional} />
        ))}

      </SimpleGrid>
      )}

    </Container>
  );
};

export default ProfessionalList;
