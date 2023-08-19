import React from 'react';
import { Flex, Box, Heading, SimpleGrid } from '@chakra-ui/react';
import ProfesionalCard from '../../../components/ProfesionalCard';

import { professionalsData } from '../../../services/professionalData';
  

const ProfessionalList: React.FC = () => {
  return (
    <div>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {professionalsData.map((professional) => (
        <ProfesionalCard key={professional.id} professional={professional} />
      ))}
        </SimpleGrid>
      
    </div>
  );
};

export default ProfessionalList;
