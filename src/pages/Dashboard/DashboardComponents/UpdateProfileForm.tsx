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
  Avatar,
  AvatarBadge,
  Center,
  IconButton,
  Progress,
} from "@chakra-ui/react";
import { auth, db, storage } from "../../../services/firebase";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage, uploadBytesResumable } from "firebase/storage";
import { SmallCloseIcon } from "@chakra-ui/icons";

interface UpdateProfileFormProps {
  userData: any;
}

const UpdateProfileForm: FC<UpdateProfileFormProps> = ({ userData }) => {
  const [file, setFile] = useState<File | null>(null);
  // eslint-disable-next-line
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const initialValues = {
    phone_number: userData?.phone_number || "",
    description: userData?.description || "",
    address: userData?.address || "",
    date_of_birth: userData?.date_of_birth || "",
    profile_image: userData?.profile_image || "",
    displayName: userData?.displayName || "",
    bloodGroup: userData?.bloodGroup || "",
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
        bloodGroup: userData.bloodGroup || "",
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



  <Progress value={uploadProgress} />

  const handleFileUpload = async () => {
    if (file) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `profile_images/${userData.uid}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
       console.log(error);
       
      },
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
    
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setFileUrl(downloadURL);
        const db = getFirestore();

        const userprofileRef = doc(db, "users", `${userData.uid}`);
        await updateDoc(userprofileRef, { profile_image: downloadURL });
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
          bloodGroup: formValues.bloodGroup,
        });
        console.log("Réussi");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations :", error);
    }
  };

  return (
    <>    <Flex bg={useColorModeValue("gray.50", "gray.800")} minH={"100vh"}>

      <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6} w={"full"}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Profile de l'utilisateur</FormLabel>
              <Stack direction={["column", "row"]} spacing={8}>
                <Center>
                  <Avatar
                    size="xl"
                    src={userData ? userData.profile_image : ""}
                  >
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
                </Center>
                <Center w="full">
                  <Button w="full" cursor="pointer" as="label" htmlFor="file">
                    Changer le profil
                  </Button>
                  <input
                    id="file"
                    type="file"
                    hidden
                    onChange={handleFileChange}
                  />
                </Center>
              </Stack>
            </FormControl>

            <FormControl mb={4}>
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

            <FormControl mb={4}>
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

            <FormControl mb={4}>
              <FormLabel>Adresse</FormLabel>
              <Input
                value={formValues.address}
                onChange={(e) =>
                  setFormValues({ ...formValues, address: e.target.value })
                }
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Groupe sanguin</FormLabel>
              <Input
                value={formValues.bloodGroup}
                onChange={(e) =>
                  setFormValues({ ...formValues, bloodGroup: e.target.value })
                }
              />
            </FormControl>

            <FormControl mb={4}>
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

            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={formValues.description}
                onChange={(e) =>
                  setFormValues({ ...formValues, description: e.target.value })
                }
                w="100%"
                minH="150px"
              />
            </FormControl>

            <Button
              type="submit"
              onClick={handleFileUpload}
              colorScheme="blue"
              mt={4}
            >
              Mettre à jour le profil
            </Button>
          </form>
        </Box>
      </Stack>
    </Flex>
    
    <Progress />
    <Progress value={uploadProgress}  size='xs' colorScheme='pink' />
    </>

  );
};

export default UpdateProfileForm;
