import React from 'react';
import { Link } from 'react-router-dom'; // Importez la Link de React Router
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
  id: number;
  name: string;
  specialty: string;
  avatarUrl: string;
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
          src={professional.avatarUrl}
          objectFit="cover"
          alt="#"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={professional.avatarUrl}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
              {professional.name}
            </Heading>
            <Text color={'gray.500'}>{professional.specialty}</Text>
          </Stack>

          {/* Utilisez la Link pour lier vers la page du profil professionnel */}
          <Link to={`/professionals/${professional.id}`}>
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
