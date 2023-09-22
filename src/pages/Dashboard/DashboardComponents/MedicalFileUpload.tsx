import { FC, useEffect, useRef, useState } from "react";
import { Flex, Button, FormControl, useToast, Progress } from "@chakra-ui/react";
import { db, auth } from "../../../services/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage, uploadBytesResumable } from "firebase/storage";
import { a } from "@chakra-ui/toast/dist/toast.types-24f022fd";

interface MedicalFileFormProps {
  userData: any;
}

const MedicalFileUpload: FC<MedicalFileFormProps> = ({ userData }) => {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  // eslint-disable-next-line
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // eslint-disable-next-line
  const [fichier, setFichier] = useState(userData?.fichier);
  // eslint-disable-next-line
  const [uploadProgress, setUploadProgress] = useState(0);
  let progressToastId: a | null = null;
  let progress = null;

  useEffect(() => {
    if (userData) {
      setFichier(userData.fichier); 
    }
  }, [userData]);
// eslint-disable-next-line
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
      setFile(e.target.files[0]);
      toast({
        title: 'image : '+ e.target.files[0].name,
        description: "Votre image a été selectionné avec succes ",
        status: "info",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      const storageRef = ref(
        getStorage(),
        `Dossier_medical/${userData.uid}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot: { bytesTransferred: number; totalBytes: number; }) => {
          progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);;
          console.log("Upload is " + progress + "% done");
          if (progressToastId) {
            toast.update(progressToastId, {
              title: "Mise à jour de votre profil",
              description: "Mise à jour " + progress + "%",
              status: "loading",
              position: "top-right",
              isClosable: true,
            });
          } else {
            progressToastId = toast({
              title: "Mise à jour de votre profil",
              description: "Mise à jour " + progress + "%",
              status: "loading",
              position: "top-right",
              isClosable: true,
            });
          }
          if (progress===100) {
            toast({
              title: "Mise a jour",
              description: "Les informations de votre profil ont été mis a jour ",
              status: "success",
              position: "top-right",
              duration: 5000,
              isClosable: true,
            });
            toast.close(progressToastId);

            // setTimeout(() => {
            //   window.location.reload();
            // }, 2000);
          }
        },
        (error:any) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
          });
        }
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
  <Progress value={uploadProgress} />;


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