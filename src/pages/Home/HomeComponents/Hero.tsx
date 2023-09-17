'use client'

import {
  Container,
  Stack,
  Flex,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react'
import { Player, Controls } from '@lottiefiles/react-lottie-player'

export default function Hero() {
  return (
    <Container maxW={'6xl'} >
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10,lg:0  }}
        pt={{ base: 5, md: 10 ,lg:10 }}
        direction={{ base: 'column', md: 'row' }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'red.400',
                zIndex: -1,
              }}>
              Les rendez-vous avec RdvDoctor
            </Text>
            <br />
            <Text as={'span'} color={'red.400'}>
              c'est facile
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Prenez soin de votre santé en toute simplicité en utilisant notre plateforme de prise de rendez-vous.Nous sommes déterminés à faciliter l'accès à des soins de qualité en mettant en relation les patients et les professionnels de santé de confiance.
          </Text>
          <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={4}
              colorScheme={'red'}
              bg={'red.400'}
              _hover={{ bg: 'red.500' }}>
              Prendre un rendez-vous
            </Button>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
            >
              En savoir plus
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          display={{ base: 'none', md: 'flex' }}
          w={'full'}>
            <Player
              autoplay
              loop
              src="https://lottie.host/59b1e30e-09b7-41e4-9fb9-b3afa2720d72/7KBLOOz4IS.json"
              style={{ height: '600px', width: '500px' }}
            >
              <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
        </Flex>
      </Stack>
    </Container>
  )
}

