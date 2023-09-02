import React from 'react';
import { Link } from 'react-router-dom'; 
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

interface Professional {
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

interface ProfesionalCardProps {
  professional: Professional;
}

const ProfesionalCard: React.FC<ProfesionalCardProps> = ({ professional }) => {
  return (
    <Center py={6}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={professional.profile_image}
          objectFit="cover"
          alt="#"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={professional.profile_image}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
              {professional.displayName}
            </Heading>
            <Text color={'gray.500'}>{professional.speciality}</Text>
            <Text color={'gray.300'}>{professional.address}</Text>
          </Stack>
          <Link to={`/proffesionels/${professional.uid}`}>
            <Button
              w={'full'}
              mt={2}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}>
              Voir le profil
            </Button>
          </Link>
        </Box>
      </Box>
    </Center>
  );
}

export default ProfesionalCard;
