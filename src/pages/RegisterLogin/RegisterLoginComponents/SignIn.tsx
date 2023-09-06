import React, { useState } from "react";
import {
  Box,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  useBreakpointValue,
  IconProps,
  Icon,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { auth } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";

const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const initialValues = {
    email: "",
    password: "",
    submit: null,
  };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;

        const token = await user.getIdToken();
        localStorage.setItem("token", token);

        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
        navigate("/dashboard");
      } catch (error) {
        setIsLoading(false);

        toast({
          title: "Connexion impossible",
          description: "nous avons un problème.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Trouvez facilement un docteur avec nous
          </Heading>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Heureux de vous revoir
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              We’re looking for amazing engineers just like you! Become a part
              of our rockstar engineering team and skyrocket your career!
            </Text>
          </Stack>
          <Box mt={10}>
            <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Votre adresse</FormLabel>
                  <Input
                    type="email"
                    placeholder="exple@gmail.com"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Votre mot de passe</FormLabel>
                  <Input
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    type={"password"}
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                </FormControl>
              </Stack>

              <Button
                loadingText="Chargement en cours..."
                isLoading={isLoading}
                type="submit"
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
              >
                Connexion
              </Button>
            </form>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}
