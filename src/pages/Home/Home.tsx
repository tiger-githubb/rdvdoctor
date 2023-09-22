import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Hero from "./HomeComponents/Hero";
import Features from "./HomeComponents/Features";
import FeaturedProfessionalsSection from "./HomeComponents/FeaturedProfessionalsSection";
import FeaturedHospitalsSection from "./HomeComponents/FeaturedHospitalsSection";
import CallToAction from "../../components/CallToAction";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase";

interface HospitalData {
  createdByUserId: string;
  created_at: string;
  name: string;
  address: string;
  phone_number: string;
  hospital_image: string;
}

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

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredHospitals, setFeaturedHospitals] = useState<HospitalData[]>(
    []
  );
  const [professionalsData, setProfessionalsData] = useState<
    ProfessionalData[]
  >([]);

  const fetchProfessionalData = async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.log("un probleme est survenu :", error);
    }
  };

  const fetchFeaturedHospitals = async () => {
    try {
      const hospitalsCollectionRef = collection(db, "hospitals");
      const q = query(
        hospitalsCollectionRef,
        orderBy("created_at", "desc"),
        limit(3)
      );

      const hospitalsSnapshot = await getDocs(q);

      const hospitalsDataArray: HospitalData[] = [];
      hospitalsSnapshot.forEach((doc) => {
        const hospitalData = doc.data();
        hospitalsDataArray.push(hospitalData as HospitalData);
      });

      setFeaturedHospitals(hospitalsDataArray);
      setIsLoading(false);
    } catch (error) {
      console.error("Une erreur est survenue :", error);
    }
  };

  useEffect(() => {
    fetchProfessionalData();
    fetchFeaturedHospitals();
  }, []);

  return (
    <Box p={0}>

        <>
          <Hero />
          <Features />
          <FeaturedProfessionalsSection professionalsData={professionalsData} isLoading={isLoading} />
          <FeaturedHospitalsSection featuredHospitals={featuredHospitals} isLoading={isLoading} />
          <CallToAction />
        </>
      
    </Box>
  );
};
export default Home;
