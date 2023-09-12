import { useEffect, useState } from "react";
import { Flex, Heading, Image, Stack, Text, Spinner } from "@chakra-ui/react";
import { auth, db } from "../../../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Profile() {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

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

          setLoading(false); 
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Stack maxH={"50vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"left"}>
        <Stack spacing={2} w={"full"} maxW={"lg"}>
          <Heading as="h3" size="lg">
            {userData ? userData.displayName : ""}
          </Heading>
          <Heading as="h5" size="sm">
            {userData ? userData.email : ""}
          </Heading>
          <Heading as="h5" size="sm">
            {userData ? userData.phone_number : "Téléphone de l'utilisateur"}
          </Heading>
          <Heading as="h5" size="sm">
            {userData ? userData.address : "Adresse de l'utilisateur"}
          </Heading>
          <Heading as="h5" size="sm">
            {userData ? userData.bloodGroup : "Groupe sanguin de l'utilisateur"}
          </Heading>
          <Heading as="h5" size="sm">
            {userData
              ? userData.date_of_birth
              : "date de naissance de l'utilisateur"}
          </Heading>
          <Text fontSize={{ base: "md", lg: "md" }} color={"gray.500"}>
            {userData ? userData.description : "description de l'utilisateur"}
          </Text>
        </Stack>
      </Flex>
      <Flex flex={1}>
        {loading ? (
          <Spinner size="lg" />
        ) : (
          <Image
            alt={"profile"}
            objectFit={"cover"}
            src={userData ? userData.profile_image : ""}
          />
        )}
      </Flex>
    </Stack>
  );
}
