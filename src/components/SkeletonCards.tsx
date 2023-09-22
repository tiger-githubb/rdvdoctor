import { Box, SimpleGrid, SkeletonCircle, SkeletonText } from "@chakra-ui/react";


const  SkeletonCards = () =>  {
    
  return (
 
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} pt={{ base: 10, md: 10 ,lg:10 }} pb={{ base: 10, md: 10 ,lg:10 }}>
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="3" />
        </Box>
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="3" />
        </Box>
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="3" />
        </Box>
        </SimpleGrid>
  )}

export default SkeletonCards;
