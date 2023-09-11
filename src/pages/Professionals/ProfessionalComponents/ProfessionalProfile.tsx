import React, { useState, useEffect } from "react";

import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
  Divider,
  UnorderedList,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/fr";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { ProfessionalData } from "../ProfessionalsPage";
import { getAuth } from "firebase/auth";
import { useToast } from "@chakra-ui/react";

moment.locale("fr");

interface Slot {
  reserved: boolean;
  reservedBy: string | null;
}

const ProfessionalProfile: React.FC = () => {
  const toast = useToast();
  const auth = getAuth();
  const user = auth.currentUser;
  const currentUserUid = user ? user.uid : null;
  const [professional, setProfessional] = useState<ProfessionalData | null>(
    null
  );
  const { uid } = useParams<{ uid: string }>();
  const [availabilityData, setAvailabilityData] = useState<any | null>(null);

  useEffect(() => {
    const fetchProfessionalData = async () => {
      try {
        const professionalDocRef = doc(collection(db, "users"), uid);
        const professionalDocSnap = await getDoc(professionalDocRef);
        if (professionalDocSnap.exists()) {
          setProfessional(professionalDocSnap.data() as ProfessionalData);
        } else {
          console.log("Professionnel non trouvé.");
        }
      } catch (error) {
        console.error("Une erreur est survenue :", error);
      }
    };
    if (uid) {
      fetchProfessionalData();
    }
  }, [uid]);

  useEffect(() => {
    const professionnelId = uid;

    const db = getDatabase();
    const databaseRef = ref(
      db,
      `professionnels/${professionnelId}/disponibilites`
    );
    onValue(databaseRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setAvailabilityData(data);
      } else {
        console.log("Aucune donnée de disponibilité trouvée.");
      }
    });
  }, [uid]);

  const handleButtonClick = (
    day: string,
    period: string,
    time: string,
    slot: Slot
  ) => {
    const { reserved, reservedBy } = slot;
    let updatedSlot: Slot;
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      toast({
        title: "Erreur",
        description: "Veuillez vous connecter avant de faire une réservation.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const alreadyReservedByUser = reservedBy === currentUserUid;

    if (reserved && reservedBy !== currentUserUid) {
      toast({
        title: "Erreur",
        description: "Ce créneau est déjà réservé par un autre patient.",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (alreadyReservedByUser) {
      updatedSlot = {
        ...slot,
        reserved: false,
        reservedBy: null,
      };
      toast({
        title: "Annulation",
        description: "Votre reservation a été anuulé",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    } else {
      updatedSlot = {
        ...slot,
        reserved: !reserved,
        reservedBy: currentUserUid,
      };
      toast({
        title: "valider",
        description: "Votre reservation est reussi",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
    setAvailabilityData(
      (prevData: {
        professionnelId: any;
        [x: string]: { [x: string]: { creneaux: any } };
      }) => {
        return {
          ...prevData,
          [day]: {
            ...prevData[day],
            [period]: {
              ...prevData[day][period],
              creneaux: {
                ...prevData[day][period].creneaux,
                [time]: updatedSlot,
              },
            },
          },
        };
      }
    );
    const professionnelId = uid;
    const db = getDatabase();

    const availabilityRef = ref(
      db,
      `professionnels/${professionnelId}/disponibilites/${day}/${period}/creneaux/${time}`
    );

    set(availabilityRef, {
      ...updatedSlot,
    });
    updateDataInFirebase(
      professionnelId,
      day,
      period,
      time,
      updatedSlot.reserved
    );
  };

  const updateDataInFirebase = (
    professionnelId: any,
    day: any,
    period: any,
    time: any,
    reserved: boolean
  ) => {
    const db = getDatabase();

    const availabilityRef = ref(
      db,
      `professionnels/${professionnelId}/disponibilites/${day}/${period}/creneaux/${time}/reserved`
    );

    set(availabilityRef, reserved)
      .then(() => {
        console.log("Etat reservation:", reserved);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container maxW={"7xl"}>
      {professional ? (
        <>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <Image
                rounded={"md"}
                alt={professional.displayName}
                src={professional.profile_image}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {professional.displayName}
                </Heading>
                <Text fontWeight={500} fontSize={"2xl"}>
                  {professional.speciality}
                </Text>
                <Text fontWeight={400} color={"gray.500"} fontSize={"xl"}>
                {professional.email}
                </Text>
                <Text fontWeight={400} color={"gray.500"} fontSize={"xl"}>
                {professional.address}
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={<StackDivider />}
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text fontSize={"lg"}>{professional.description}</Text>
                </VStack>

                <Box>
                  <Text fontSize="xl" fontWeight="bold">
                    Disponibilités
                  </Text>
                  {availabilityData ? (
                    <UnorderedList mt={3} spacing={2} listStyleType="none">
                      {Object.entries(availabilityData).map(
                        ([day, slots]: [string, any]) => (
                          <ListItem key={day}>
                            <Stack direction="row" alignItems="center">
                              <Text
                                fontSize={{ base: "16px", lg: "18px" }}
                                color={"yellow.500"}
                                fontWeight={"500"}
                                textTransform={"uppercase"}
                                mb={"4"}
                              >
                                {day}:
                              </Text>
                            </Stack>
                            <SimpleGrid
                              columns={{ base: 1, md: 2 }}
                              spacing={10}
                            >
                              <List spacing={2}>
                                <Text fontWeight="bold">Matin:</Text>
                                {Object.entries(slots.matin.creneaux).map(
                                  ([time, slot]: [string, any]) => (
                                    <Button
                                      key={time}
                                      colorScheme={
                                        slot.reserved ? "gray" : "blue"
                                      }
                                      variant="outline"
                                      mr={2}
                                      onClick={() =>
                                        handleButtonClick(
                                          day,
                                          "matin",
                                          time,
                                          slot
                                        )
                                      }
                                    >
                                      {slot.start} - {slot.end}
                                    </Button>
                                  )
                                )}
                              </List>
                              <List spacing={2}>
                              <Text fontWeight="bold">Soir:</Text>
                              {Object.entries(slots.soir.creneaux).map(
                                  ([time, slot]: [string, any]) => (
                                    <Button
                                      key={time}
                                      colorScheme={
                                        slot.reserved ? "gray" : "blue"
                                      }
                                      variant="outline"
                                      mr={2}
                                      onClick={() =>
                                        handleButtonClick(
                                          day,
                                          "soir",
                                          time,
                                          slot
                                        )
                                      }
                                    >
                                      {slot.start} - {slot.end}
                                    </Button>
                                  )
                                )}
                              </List>
                            </SimpleGrid>
                          </ListItem>
                        )
                      )}
                    </UnorderedList>
                  ) : (
                    <Text mt={3}>Aucune donnée de disponibilité trouvée.</Text>
                  )}
                </Box>
              </Stack>
            </Stack>
            <Divider my={6} />
          </SimpleGrid>
        </>
      ) : (
        <div>Professionnel non trouvé.</div>
      )}
    </Container>
  );
};

export default ProfessionalProfile;
