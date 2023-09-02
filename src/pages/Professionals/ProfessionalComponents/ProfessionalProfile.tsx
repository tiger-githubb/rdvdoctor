import React, { useState , useEffect} from 'react';
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
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/fr';
import { collection, doc, getDoc } from 'firebase/firestore'; 
import { db } from '../../../services/firebase';
import { ProfessionalData } from '../ProfessionalsPage';

moment.locale('fr');

const localizer = momentLocalizer(moment);


const ProfessionalProfile: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [professional, setProfessional] = useState<ProfessionalData | null>(null); 
  const { uid } = useParams<{ uid: string }>();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchProfessionalData = async () => {
      try {
        const professionalDocRef = doc(collection(db, 'users'), uid);
        const professionalDocSnap = await getDoc(professionalDocRef);
        if (professionalDocSnap.exists()) {
          setProfessional(professionalDocSnap.data() as ProfessionalData);
        } else {
          console.log('Professionnel non trouvé.');
        }
      } catch (error) {
        console.error('Une erreur est survenue :', error);
      }
    };

    if (uid) {
      fetchProfessionalData();
    }
  }, [uid]);



  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const availabilityData = [
    new Date('2023-08-25'),
    new Date('2023-08-26'),
    new Date('2023-08-27'),
  ];

  return (
    <Box p={4} >
          {professional ? ( // Vérifiez si professional existe avant d'afficher les détails

      <><Flex direction="column" align="center" py={8}>
          <Image src={professional.profile_image} alt={professional.displayName} boxSize="200px" borderRadius="full" />
          <Heading mt={4} fontSize="xl">
            {professional.displayName}
          </Heading>
          <Text color="gray.600">{professional.speciality}</Text>
          <Text color={'gray.300'}>{professional.address}</Text>
          <Button mt={4} colorScheme="pink" onClick={handleOpenModal}>
            Prendre un rendez-vous
          </Button>
        </Flex><Divider my={6} /><Stack spacing={4}>

            <Text fontSize="xl" fontWeight="bold">
              Sélectionnez une date de rendez-vous
            </Text>
            <DatePicker selected={selectedDate} onChange={handleDateChange} />

            <Text fontSize="xl" fontWeight="bold">
              Disponibilités
            </Text>
            <Calendar
              localizer={localizer}
              events={availabilityData.map((date) => ({
                start: date,
                end: date,
                title: 'Disponible',
              }))}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '500px' }} />
          </Stack><Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Prendre un rendez-vous avec {professional.displayName}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Choisissez une date de rendez-vous :</Text>
                <DatePicker selected={selectedDate} onChange={handleDateChange} />
                {/* Ajoutez d'autres champs pour le créneau horaire, les informations de contact, etc. */}
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="pink" mr={3} onClick={handleCloseModal}>
                  Annuler
                </Button>
                <Button colorScheme="blue">Prendre rendez-vous</Button>
              </ModalFooter>
            </ModalContent>
          </Modal></>
       ) : (
        <div>Professionnel non trouvé.</div> // Gérez le cas où professional est null
      )}
    </Box>
  );
};
 
export default ProfessionalProfile;
