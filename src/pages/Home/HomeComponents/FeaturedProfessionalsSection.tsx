import { FC } from "react";
import { Box, Container, Flex, Heading, SimpleGrid, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import ProfesionalCard from "../../../components/ProfesionalCard";



interface FeaturedProfessionalsSectionProps {
  professionalsData: any;
  isLoading: boolean;
}

const FeaturedProfessionalsSection: FC<FeaturedProfessionalsSectionProps> = ({ professionalsData,isLoading }) => {

  return (
    <Box w="100%"  m={0} p={0} py={12} bg="gray.100">
      <Container maxW={"6xl"}>
        <Heading as="h2" size="lg" mb={4}>
          Professionnels de santé en vedette
        </Heading>
        {isLoading ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
        </Box>
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
        </Box>
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
        </Box>
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {professionalsData.map((professional:any) => (
            <ProfesionalCard
              key={professional.uid}
              professional={professional}
            />
          ))}
        </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default FeaturedProfessionalsSection;
