import {
  chakra,
  Link,
  Stack,
  Box,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import {  FaSearchengin } from "react-icons/fa";

const CallToAction = () => {
  return (
    <Box pb={0}>
      <Stack
        pos="relative"
        bgGradient={`linear(to-l, blue.200, blue.100 , cyan.100)`}
        height="250px"
        w="100%"
      ></Stack>
      <Box
        maxW="3xl"
        p={4}
        isolation="isolate"
        zIndex={3}
        mt="-10rem"
        marginInline="auto"
      >
        <Box
          boxShadow={useColorModeValue(
            "0 2px 3px rgba(160, 174, 192, 0.3)",
            "0 2px 3px rgba(9, 17, 28, 0.6)"
          )}
          bg={useColorModeValue("white", "gray.800")}
          p={{ base: 4, sm: 8 }}
          overflow="hidden"
          rounded="2xl"
        >
          <Stack
            pos="relative"
            zIndex={1}
            direction="column"
            spacing={5}
            textAlign="center"
          >
            <chakra.h1 fontSize="4xl" lineHeight={1.2} fontWeight="bold">
              Besoin de prendre un rendez-vous ?
            </chakra.h1>
            <chakra.h1
              color="gray.400"
              fontSize="xl"
              maxW="600px"
              lineHeight={1.2}
            >
              Prenez le contrôle de votre santé dès maintenant avec RdvDoctor.
              Réservez votre premier rendez-vous dès aujourd'hui.
            </chakra.h1>

            <Stack direction={{ base: "column", md: "row" }}  align="center" justify="center" >
              <Button
                leftIcon={<FaSearchengin />}
                as={Link}
                href="/recherche"
                rounded="md"
                colorScheme="gray"
                variant="solid"
              >
                Trouver un proffesionnel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default CallToAction;
