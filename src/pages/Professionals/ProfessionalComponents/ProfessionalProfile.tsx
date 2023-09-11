import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Divider,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ListItem,
  UnorderedList,
  List,
  ListIcon,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/fr";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { FaCheckCircle } from "react-icons/fa";
import { ProfessionalData } from "../ProfessionalsPage";

moment.locale("fr");

const ProfessionalProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [professional, setProfessional] = useState<ProfessionalData | null>(
    null
  );
  const { uid } = useParams<{ uid: string }>();
  const [availabilityData, setAvailabilityData] = useState<any | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
        console.log("donnée dispo", data);
      } else {
        console.log("Aucune donnée de disponibilité trouvée.");
      }
    });
  }, [uid]);

  return (
    <Box p={4}>
      {professional ? (
        <>
          <Flex direction="column" align="center" py={8}>
            <Image
              src={professional.profile_image}
              alt={professional.displayName}
              boxSize="200px"
              borderRadius="full"
            />
            <Heading mt={4} fontSize="xl">
              {professional.displayName}
            </Heading>
            <Text color="gray.600">{professional.speciality}</Text>
            <Text color={"gray.300"}>{professional.address}</Text>
            <Button mt={4} colorScheme="pink" onClick={handleOpenModal}>
              Prendre un rendez-vous
            </Button>
          </Flex>
          <Divider my={6} />
          <Stack spacing={4}>
            <Text fontSize="xl" fontWeight="bold">
              Sélectionnez une date de rendez-vous
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              Disponibilités
            </Text>
            {availabilityData ? (
              <UnorderedList mt={3} spacing={2} listStyleType="none">
                {Object.entries(availabilityData).map(
                  ([day, slots]: [string, any]) => (
                    <ListItem key={day}>
                      <Stack direction="row" alignItems="center">
                        <ListIcon as={FaCheckCircle} color="green.500" />
                        <Text fontWeight="bold">{day}:</Text>
                      </Stack>
                      <List spacing={1} ml={6}>
                        <ListItem>
                          <Text fontWeight="bold">Matin:</Text>
                          {Object.entries(slots.matin.creneaux).map(
                            ([time, slot]: [string, any]) => (
                              <div key={time}>
                                {slot.start} - {slot.end}
                              </div>
                            )
                          )}
                        </ListItem>
                        <ListItem>
                          <Text fontWeight="bold">Soir:</Text>
                          {Object.entries(slots.soir.creneaux).map(
                            ([time, slot]: [string, any]) => (
                              <div key={time}>
                                {slot.start} - {slot.end}
                              </div>
                            )
                          )}
                        </ListItem>
                      </List>
                    </ListItem>
                  )
                )}
              </UnorderedList>
            ) : (
              <Text mt={3}>Aucune donnée de disponibilité trouvée.</Text>
            )}
          </Stack>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                Prendre un rendez-vous avec {professional.displayName}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Choisissez une date de rendez-vous :</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="pink" mr={3} onClick={handleCloseModal}>
                  Annuler
                </Button>
                <Button colorScheme="blue">Prendre rendez-vous</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <div>Professionnel non trouvé.</div>
      )}
    </Box>
  );
};

export default ProfessionalProfile;
