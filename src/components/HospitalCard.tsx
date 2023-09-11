import React from 'react';
import {
  Heading,
  Box,
  Center,
  Image,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

interface Hospital {
  createdByUserId: string; 
  created_at:string;
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
            <Heading fontSize={'md'} fontWeight={500} fontFamily={'body'}>
              {hospital.name}
            </Heading>
            <Text color={'gray.500'}>{hospital.address}</Text>
            <Text color={'gray.500'}>{hospital.phone_number}</Text>
          </Stack>

        </Box>
      </Box>
    </Center>
  );
};


export default HospitalCard;
