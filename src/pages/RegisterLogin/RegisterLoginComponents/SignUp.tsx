import React, { FC, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { useFormik } from "formik";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../services/firebase";
import { doc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";

const SignUp: FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    terms: true,
    submit: null,
  };

  const { values,  handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: async (values) => {
        try {
          setIsLoading(true);

          const userCredential = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          const user = userCredential.user;

          const defaultUserData = {
            displayName: values.name,
            email: user.email,
            uid: user.uid,
            role: 2,
            phone_number: "",
            description: "",
            speciality: "",
            address: "",
            date_of_birth: "",
            profile_image: "",
          };

          await setDoc(doc(db, "users", user.uid), defaultUserData);

          const token = await user.getIdToken();
          localStorage.setItem("token", token);

          const userData = {
            ...defaultUserData,
          };
          localStorage.setItem("user", JSON.stringify(userData));

          toast({
            title: "Inscription réussie",
            description: "Vous êtes maintenant inscrit.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setIsLoading(false);
          navigate("/dashboard");
        } catch (error: any) {
          setIsLoading(false);

          let errorMessage =
            "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.";

          switch (error.code) {
            case "auth/email-already-in-use":
              errorMessage =
                "Cette adresse e-mail est déjà associée à un compte. Veuillez vous connecter ou utiliser une autre adresse e-mail.";
              break;
            case "auth/invalid-email":
              errorMessage =
                "L'adresse e-mail saisie est invalide. Veuillez saisir une adresse e-mail valide.";
              break;
            case "auth/weak-password":
              errorMessage =
                "Le mot de passe doit comporter au moins 6 caractères.";
              break;
            default:
              errorMessage =
                "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.";
              break;
          }

          toast({
            title: "Erreur lors de l'inscription",
            description: errorMessage,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      },
    });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Inscription
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Bienvenue parmis nous ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={10}
        >
          <Stack spacing={4}>
            <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
              <FormControl id="name">
                <FormLabel>Votre nom complet</FormLabel>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Votre adresse</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Votre mot de passe</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Chargement en cours..."
                  isLoading={isLoading}
                  size="lg"
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  S'inscrire
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Je suis de la maison ?{" "}
                  <Link color={"blue.400"}>Connexion</Link>
                </Text>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
