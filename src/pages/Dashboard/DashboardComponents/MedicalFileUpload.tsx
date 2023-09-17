import { FC, useEffect, useRef, useState } from "react";
import {
  Flex,
  Button,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { storage, db, auth } from "../../../services/firebase";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

interface MedicalFileFormProps {
  userData: any;
}

const MedicalFileUpload: FC<MedicalFileFormProps> = ({ userData }) => {
  // eslint-disable-next-line
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  // eslint-disable-next-line
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const initialValues = {
    fichier: userData?.fichier,
  };
  useEffect(() => {
    if(userData?.Dossier_medical) {
        setFileUrls(userData.Dossier_medical);
      }
  }, [userData]);
  // eslint-disable-next-line
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
      
      const storageRef = ref(
        storage,
        `Dossier_medical/${userData.uid}/${file.name}`
      );

      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setFileUrl(downloadURL);
        const db = getFirestore();
        const userprofileRef = doc(db, "users", `${userData.uid}`);
        await updateDoc(userprofileRef, { fichier: downloadURL });
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
          // eslint-disable-next-line
        const userDocRef = doc(db, "users", user.uid);

        if (formValues.fichier instanceof File) {
          const storageRef = ref(storage, `Dossier_medical/${user.uid}`);
          const snapshot = await uploadBytes(storageRef, formValues.fichier);

          const imageUrl = await getDownloadURL(snapshot.ref);

          const userDocRef = doc(db, "users", userData.uid);
          await updateDoc(userDocRef, { fichier: imageUrl });
        }
        console.log("Réussi");
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