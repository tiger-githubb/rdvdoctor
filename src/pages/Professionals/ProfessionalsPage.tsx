import React, { useState, useEffect } from "react";
import {
  SimpleGrid,
  Container,
  Center,
  Divider,
} from "@chakra-ui/react";
import ProfesionalCard from "../../components/ProfesionalCard";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import SkeletonCards from "../../components/SkeletonCards";

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
  const [isLoading, setIsLoading] = useState(true);

  const [professionalsData, setProfessionalsData] = useState<
    ProfessionalData[]
  >([]);

  const fetchProfessionalData = async () => {
    try {
      const professionalCollectionRef = collection(db, "users");
      const professionalsSnapshot = await getDocs(professionalCollectionRef);

      const professionalsDataArray: ProfessionalData[] = [];
      professionalsSnapshot.forEach((doc) => {
        const professionalData = doc.data() as ProfessionalData;
        if (professionalData.role === 1) {
          professionalsDataArray.push(professionalData);
        }
      });
      setProfessionalsData(professionalsDataArray);
      setIsLoading(false);
    } catch (error) {
      console.log("un probleme est survenu :", error);
    }
  };

  useEffect(() => {
    fetchProfessionalData();
  }, []);

  return (
    <>
      <Center height="50px">
        <Divider orientation="vertical" />
      </Center>
      <Container maxW={"6xl"} pt={{ base: 30, md: 30, lg: 30 }}>
        {isLoading ? (
          <>
            <SkeletonCards />
            <SkeletonCards />
          </>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {professionalsData.map((professional) => (
              <ProfesionalCard
                key={professional.uid}
                professional={professional}
              />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </>
  );
};

export default ProfessionalsPage;
