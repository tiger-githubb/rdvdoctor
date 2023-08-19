import React from 'react';
import { Box, Flex, Input, Button, Select } from '@chakra-ui/react';

const SearchBar: React.FC = () => {
  return (
    <Box bg="gray.100" p={4} rounded="md">
      <Flex direction={{ base: 'column', md: 'row' }} align={{ base: 'stretch', md: 'center' }}>
        {/* Section 1: Nom, Emplacement, Spécialité */}
        <Box flex={{ base: '1', md: '2' }} mr={{ base: '0', md: '4' }} mb={{ base: '4', md: '0' }}>
          <Flex direction={{ base: 'column', md: 'row' }} align={{ base: 'start', md: 'center' }}>
            <Input
              type="text"
              placeholder="Nom du professionnel,Emplacement,Spécialité ..."
              flex="1"
              mr={{ base: '0', md: '4' }}
              mb={{ base: '4', md: '0' }}
            />

          </Flex>
        </Box>

        {/* Section 2: Localisation */}
        <Box flex={{ base: '1', md: '1' }}>
          <Flex direction={{ base: 'column', md: 'row' }} align={{ base: 'start', md: 'center' }}>
            <Select placeholder="Où ?" flex="1" mr={{ base: '0', md: '4' }} mb={{ base: '4', md: '0' }}>
              {/* Options de localisation */}
            </Select>
            <Button colorScheme="pink" flex="1" px={8}>
              Rechercher
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default SearchBar;
