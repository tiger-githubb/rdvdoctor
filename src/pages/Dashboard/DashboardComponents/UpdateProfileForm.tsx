import { FC, useEffect, useState } from "react";
import {
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
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
    <>
      <form onSubmit={handleSubmit}>
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

        {/* <FormControl>
          <FormLabel>Image de profil</FormLabel>
          <Input
            type="file"
            onChange={(e) =>
              setFormValues({ ...formValues, profile_image: e.target.files[0] })
            }
          />
          <Image src={formValues.profile_image} />
        </FormControl> */}

        <Button type="submit" colorScheme="blue">
          Mettre à jour le profil
        </Button>
      </form>
    </>
  );
};

export default UpdateProfileForm;
