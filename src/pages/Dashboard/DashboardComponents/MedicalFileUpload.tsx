import { FC, useRef, useState } from "react";
import { Flex, Button, FormLabel, FormControl } from "@chakra-ui/react";
import { db, auth } from "../../../services/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

interface MedicalFileFormProps {
  userData: any;
}

const MedicalFileUpload: FC<MedicalFileFormProps> = ({ userData }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [formValues, setFormValues] = useState<{
    fichiers: string[];
  }>({
    fichiers: [],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files);
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
    handleFileUpload()

    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        if (formValues.fichiers.length !== 0) {
          await updateDoc(userDocRef, {
            fichiers: formValues.fichiers,
          });

          console.log("Réussi");
        }
      }
    } catch (error) {
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
          <FormLabel>Document de santé</FormLabel>
          <input type="file" onChange={handleFileChange} ref={fileInputRef} />
        </FormControl>
      </Flex>

      <Button
        type="submit"
        colorScheme="blue"
        mt={4}
      >
        Ajouter le document
      </Button>
    </form>
  );
};

export default MedicalFileUpload;
