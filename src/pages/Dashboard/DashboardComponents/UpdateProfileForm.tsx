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
import { auth, db, storage } from "../../../services/firebase";
import {
  updateDoc,
  doc,
  addDoc,
  collection,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { log } from "console";

interface UpdateProfileFormProps {
  userData: any;
}

const UpdateProfileForm: FC<UpdateProfileFormProps> = ({ userData }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0].name);
      setFile(e.target.files[0]);
    }
  };
  const handleFileUpload = async () => {
    if (file) {
      const storage = getStorage();
      console.log(file.name);
      console.log(userData.uid);
      
      const storageRef = ref(storage, `profile_images/${userData.uid}/${file.name}`);

      try {
        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);
        setFileUrl(downloadURL);

        const db = getFirestore();
        const userprofileRef = doc(db, "users",`${userData.uid}`);
        await updateDoc(userprofileRef, { profile_image: downloadURL });

        alert("Le fichier a été téléchargé avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'envoi du fichier : ", error);
        alert("Une erreur s'est produite lors de l'envoi du fichier.");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        if (formValues.profile_image instanceof File) {
          const storageRef = ref(storage, `profile_images/${user.uid}`);
          const snapshot = await uploadBytes(
            storageRef,
            formValues.profile_image
          );
          
          const imageUrl = await getDownloadURL(snapshot.ref);

          const userDocRef = doc(db, "users", userData.uid);
          await updateDoc(userDocRef, { profile_image: imageUrl });
        }
        await updateDoc(userDocRef, {
          phone_number: formValues.phone_number,
          displayName: formValues.displayName,
          description: formValues.description,
          address: formValues.address,
          date_of_birth: formValues.date_of_birth,
        });
        console.log("Réussi");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations :", error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"left"}
      justify={"left"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Grid templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              <FormControl>
                <FormLabel>Nom d'utilisateur</FormLabel>
                <Input
                  value={formValues.displayName}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      displayName: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Numéro de téléphone</FormLabel>
                <Input
                  value={formValues.phone_number}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      phone_number: e.target.value,
                    })
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
                  setFormValues({
                    ...formValues,
                    date_of_birth: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Photo de profil</FormLabel>
              <input type="file" onChange={handleFileChange} />

            </FormControl>


            <Button type="submit" onClick={handleFileUpload} colorScheme="blue" mt={4}>
              Mettre à jour le profil
            </Button>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default UpdateProfileForm;
