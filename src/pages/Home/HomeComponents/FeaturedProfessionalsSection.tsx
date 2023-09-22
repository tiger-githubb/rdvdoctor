import { FC } from "react";
import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import ProfesionalCard from "../../../components/ProfesionalCard";



interface FeaturedProfessionalsSectionProps {
  professionalsData: any;
}

const FeaturedProfessionalsSection: FC<FeaturedProfessionalsSectionProps> = ({ professionalsData }) => {

  return (
    <Box w="100%"  m={0} p={0} py={12} bg="gray.100">
      <Container maxW={"6xl"}>
        <Heading as="h2" size="lg" mb={4}>
          Professionnels de santé en vedette
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {professionalsData.map((professional:any) => (
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
