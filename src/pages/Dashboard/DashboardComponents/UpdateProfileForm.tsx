import { FC, useEffect, useState } from "react";
import {
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Box,
  Flex,
  Stack,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import { auth, db } from "../../../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";

const UpdateProfileForm: FC = () => {
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const q = query(
            collection(db, "users"),
            where("uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            const userDataFromDoc = doc.data();
            setUserData(userDataFromDoc);
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const initialValues = {
    phone_number: userData?.phone_number || "",
    description: userData?.description || "",
    address: userData?.address || "",
    date_of_birth: userData?.date_of_birth || "",
    profile_image: userData?.profile_image || "",
    displayName: userData?.displayName || "",
  };
  useEffect(() => {
    if (userData) {
      setFormValues({
        phone_number: userData.phone_number || "",
        description: userData.description || "",
        address: userData.address || "",
        date_of_birth: userData.date_of_birth || "",
        profile_image: userData.profile_image || "",
        displayName: userData.displayName || "",
      });
    }
  }, [userData]);
  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        // Mettre à jour les informations dans la base de données
        await updateDoc(userDocRef, {
          phone_number: formValues.phone_number,
          displayName: formValues.displayName,
          description: formValues.description,
          address: formValues.address,
          date_of_birth: formValues.date_of_birth,
          profile_image: formValues.profile_image,
        });

        // Mettre à jour l'état userData pour refléter les nouvelles données
        setUserData({
          ...userData,
          phone_number: formValues.phone_number,
          displayName: formValues.displayName,
          description: formValues.description,
          address: formValues.address,
          date_of_birth: formValues.date_of_birth,
          profile_image: formValues.profile_image,
        });

        console.log("reusi");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations :", error);
    }
  };
  return (
<Flex
  minH={'100vh'}
  align={'left'}
  justify={'left'}
  bg={useColorModeValue('gray.50', 'gray.800')}
>
  <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}
    >
      <form onSubmit={handleSubmit}>
        <Grid templateColumns={{ sm: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
          <FormControl>
            <FormLabel>Nom d'utilisateur</FormLabel>
            <Input
              value={formValues.displayName}
              onChange={(e) =>
                setFormValues({ ...formValues, displayName: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Numéro de téléphone</FormLabel>
            <Input
              value={formValues.phone_number}
              onChange={(e) =>
                setFormValues({ ...formValues, phone_number: e.target.value })
              }
            />
          </FormControl>
        </Grid>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={formValues.description}
            onChange={(e) =>
              setFormValues({ ...formValues, description: e.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Adresse</FormLabel>
          <Input
            value={formValues.address}
            onChange={(e) =>
              setFormValues({ ...formValues, address: e.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Date de naissance</FormLabel>
          <Input
            type="date"
            value={formValues.date_of_birth}
            onChange={(e) =>
              setFormValues({ ...formValues, date_of_birth: e.target.value })
            }
          />
        </FormControl>

        {/* Ajoutez le champ pour l'image de profil ici, si nécessaire */}

        <Button type="submit" colorScheme="blue" mt={4}>
          Mettre à jour le profil
        </Button>
      </form>
    </Box>
  </Stack>
</Flex>

  );
};

export default UpdateProfileForm;
