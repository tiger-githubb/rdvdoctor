'use client'

import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button
} from '@chakra-ui/react'


export default function Hero () {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Trouvez un rendez-vous avec {' '}
          <Text as={'span'} color={'orange.400'}>
            Votre medecin ou docteur
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Texte de description de la solution
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'orange'}
            bg={'orange.400'}
            _hover={{ bg: 'orange.500' }}>
            Commencez
          </Button>
          <Button rounded={'full'} px={6}>
            En savoir plus
          </Button>
        </Stack>
        <Flex w={'full'}>
        </Flex>
      </Stack>
    </Container>
  )
}