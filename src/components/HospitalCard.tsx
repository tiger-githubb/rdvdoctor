import React from 'react';
import {
  Heading,
  Box,
  Center,
  Image,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

interface Hospital {
  id: string; 
  name: string;
  address: string;
  phone_number: string;
  hospital_image: string;
}


interface HospitalCardProps {
  hospital: Hospital;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  return (
    <Center py={6}>
      <Box
        maxW={'300px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Image
          h={'120px'}
          w={'full'}
          src={hospital.hospital_image}
          objectFit="cover"
          alt="#"
        />

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
              {hospital.name}
            </Heading>
            <Text color={'gray.500'}>{hospital.address}</Text>
          </Stack>

          <Button
            w={'full'}
            mt={2}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            Voir le profil
          </Button>
        </Box>
      </Box>
    </Center>
  );
};


export default HospitalCard;
