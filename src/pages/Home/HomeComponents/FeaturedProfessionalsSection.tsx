import React, { useState, useEffect } from "react";
import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import ProfesionalCard from "../../../components/ProfesionalCard";
import { collection } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { getDocs } from "firebase/firestore";

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

const FeaturedProfessionalsSection: React.FC = () => {
  const [professionalsData, setProfessionalsData] = useState<
    ProfessionalData[]
  >([]);

  const fetchProfessionalData = async () => {
    try {
      const professionalCollectionRef = collection(db, "users");
      const professionalsSnapshot = await getDocs(professionalCollectionRef);

      const professionalsDataArray: ProfessionalData[] = [];
      let count = 0; 
      professionalsSnapshot.forEach((doc) => {
        const professionalData = doc.data() as ProfessionalData;
        if (professionalData.role === 1 && count < 3) {
          professionalsDataArray.push(professionalData);
        }
      });
      setProfessionalsData(professionalsDataArray);
    } catch (error) {
      console.log("un probleme est survenu :", error);
    }
  };

  useEffect(() => {
    fetchProfessionalData();
  }, []);
  return (
    <Box w="100%"  m={0} p={0} py={12} bg="gray.100">
      <Container maxW={"6xl"}>
        <Heading as="h2" size="lg" mb={4}>
          Professionnels de santé en vedette
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {professionalsData.map((professional) => (
            <ProfesionalCard
              key={professional.uid}
              professional={professional}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default FeaturedProfessionalsSection;
