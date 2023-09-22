import { FC, useRef, useState } from "react";
import { Flex, Button, FormControl, useToast } from "@chakra-ui/react";
import { db, auth } from "../../../services/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

interface MedicalFileFormProps {
  userData: any;
}

const MedicalFileUpload: FC<MedicalFileFormProps> = ({ userData }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);  
  const toast = useToast();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      handleFileUpload()
    } catch (error) {
      console.error('Erreur de mise à jour doc', error)
      toast({
        title: 'Erreur',
        description: "Impossible de mettre à jour les informations",
        status: 'error'
      })
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        if (formValues.fichiers.length !== 0) {
          await updateDoc(userDocRef, {
            fichiers: formValues.fichiers,
          });
          console.log("reussi");

          toast({
            title: "Mise a jour",
            description: "Les informations de votre profir ont été mis a jour ",
            status: "success",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations :", error);
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
        console.log('Fichier uploadé') 
        const downloadURL = await getDownloadURL(storageRef);
        console.log('URL téléchargement récupérée', downloadURL)

        setFormValues((prevValues) => ({
          fichiers: [...(prevValues.fichiers), downloadURL],
        }));
        
      } catch (error) {
        console.error("Erreur lors de l'envoi du fichier : ", error);
        toast({
          title: 'Erreur',
          description: "Impossible d'uploader le fichier",
          status: 'error'
        })
      }
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
        <center>
        <FormControl>
          
          <p></p>
          <Button w="full" cursor="pointer" as="label" htmlFor="file">
                    Télecharger Votre dossier Medical
          </Button>
                  <input
                    id="file"
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    ref={fileInputRef} 
                  />
        </FormControl>
        </center>
        
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
