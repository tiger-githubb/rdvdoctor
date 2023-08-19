import React from 'react';
import { Box, Button, Center, Heading, Text, useColorModeValue } from '@chakra-ui/react';

const CallToAction: React.FC = () => {
  return (
    <Center py={12}>
      <Box
        maxW={'lg'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        textAlign={'center'}
      >
        <Heading fontSize={'2xl'} mb={4}>
          Besoin de prendre un rendez-vous ?
        </Heading>
        <Text fontSize={'lg'} color={'gray.500'}>
          Trouvez le professionnel de santé idéal pour vos besoins.
        </Text>
        <Button
          mt={8}
          bg={useColorModeValue('#151f21', 'gray.900')}
          color={'white'}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
        >
          Rechercher des professionnels
        </Button>
      </Box>
    </Center>
  );
};

export default CallToAction;
