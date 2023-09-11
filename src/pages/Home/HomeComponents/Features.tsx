import { FcAlarmClock, FcGlobe, FcTimeline } from "react-icons/fc";

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,

} from "@chakra-ui/react";

import { ReactElement } from "react";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function features() {
  return (
    <Container maxW={"6xl"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            // bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Rdv Doctor
          </Text>
          <Heading>Pourquoi choisir RdvDoctor ?</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            Choisissez RdvDoctor pour une planification simple des rendez-vous
            médicaux et un large choix de professionnels de santé. Bénéficiez
            également de rappels, confidentialité et sécurité.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
              // borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }
          >
            <Feature
              icon={<Icon as={FcGlobe} color={"yellow.500"} w={5} h={5} />}
              iconBg={"yellow.100"}
              text={"Large réseau de professionnels"}
            />
            <Feature
              icon={<Icon as={FcTimeline} color={"green.500"} w={5} h={5} />}
              iconBg={"green.100"}
              text={"Prise de rendez-vous instantanée"}
            />
            <Feature
              icon={<Icon as={FcAlarmClock} color={"purple.500"} w={5} h={5} />}
              iconBg={"purple.100"}
              text={"Rappels de rendez-vous"}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={"https://img.freepik.com/photos-gratuite/equipe-afro-americaine-travaillant-rapports-controle-reception-hopital-analysant-rendez-vous-patients-papiers-medecin-receptionniste-utilisant-formulaires-medicaux-pour-aider-personnes-malades_482257-51268.jpg?w=826&t=st=1694474056~exp=1694474656~hmac=ce50ef07efa388fd08aa2ec7af8e9b40a62bf7236d6ff83052a9d21f7db0c574"
            }
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
