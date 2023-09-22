import { FC, useEffect, useRef, useState } from "react";
import { Flex, Button, FormLabel, FormControl, useToast } from "@chakra-ui/react";
import { storage, db, auth } from "../../../services/firebase";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

interface MedicalFileFormProps {
  userData: any;
}

const MedicalFileUpload: FC<MedicalFileFormProps> = ({ userData }) => {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fichier, setFichier] = useState(userData?.fichier);

  useEffect(() => {
    if (userData) {
      setFichier(userData.fichier); 
    }
  }, [userData]);

  const initialValues = {
    fichier: userData?.fichier,
  };

  const [formValues, setFormValues] = useState<{
    fichiers: string[];
  }>({
    fichiers: [],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0].name);
      toast({
        title: "Dossier Medical",
        description: " votre fichier a bien été selectioné",
        status: "loading",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      const storageRef = ref(
        getStorage(),
        `Dossier_medical/${userData.uid}/${file.name}`
      );

      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        console.log(downloadURL);

        setFormValues((prevValues) => ({
          fichiers: [...(prevValues.fichiers), downloadURL],
        }));
      } catch (error) {
        console.error("Erreur lors de l'envoi du fichier : ", error);
        alert("Une erreur s'est produite lors de l'envoi du fichier.");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormValues((prev) => ({
      ...prev,
      fichiers: prev.fichiers,
    }));
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        if (formValues.fichiers.length !== 0) {
          await updateDoc(userDocRef, {
            fichiers: formValues.fichiers,
          });

          toast({
            title: "Dossier Medical",
            description: " Votre dossier medical a été Ajouter",
            status: "success",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        title: "Dossier Medical",
        description: " Erreur lors de la mise à jour de votre dossier medical",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      console.error("Erreur lors de la mise à jour des informations :", error);
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <Flex
        direction="column"
        width="400px"
        height="300px"
        border="2px dashed gray"
        borderRadius={20}
        alignItems="center"
        justifyContent="center"
      >
        <FormControl>
          <Button w="full" cursor="pointer" as="label" htmlFor="fileadd">
                    Télecharger Votre dossier Medical
          </Button>
          <input type="file" id="fileadd" onChange={handleFileChange} hidden ref={fileInputRef} />
        </FormControl>
      </Flex>

      <Button
        type="submit"
        onClick={handleFileUpload}
        colorScheme="blue"
        mt={4}
      >
        Ajouter le document
      </Button>
    </form>
  );
};

export default MedicalFileUpload;