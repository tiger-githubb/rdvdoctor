import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Divider,
  useColorModeValue,Stack
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importez les styles de react-datepicker
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Importez les styles de react-big-calendar
import moment from 'moment';
import 'moment/locale/fr'; // Importez la localisation de moment pour le français

// Définissez la localisation française pour moment
moment.locale('fr');

const localizer = momentLocalizer(moment);

// ... (le reste de votre code)


interface ProfessionalProfileProps {
  name: string;
  specialty: string;
  location: string;
  avatarUrl: string;
  description: string;
}

const ProfessionalProfile: React.FC<ProfessionalProfileProps> = ({
  name,
  specialty,
  location,
  avatarUrl,
  description,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const availabilityData = [
    new Date('2023-08-25'),
    new Date('2023-08-26'),
    new Date('2023-08-27'),
    // Ajoutez plus de dates disponibles ici
  ];

  return (
    <Box p={4}>
      <Flex direction="column" align="center" py={8}>
        <Image src={avatarUrl} alt={name} boxSize="200px" borderRadius="full" />
        <Heading mt={4} fontSize="xl">
          {name}
        </Heading>
        <Text color="gray.600">{specialty}</Text>
        <Text color="gray.500">{location}</Text>
        <Button mt={4} colorScheme="pink">
          Prendre un rendez-vous
        </Button>
      </Flex>
      <Divider my={6} />

      <Stack spacing={4}>
       {/* Utilisez le composant DatePicker de react-datepicker */}
       <Text fontSize="xl" fontWeight="bold">
          Sélectionnez une date de rendez-vous
        </Text>
        <DatePicker selected={selectedDate} onChange={handleDateChange} />

        {/* Utilisez le composant Calendar de react-big-calendar */}
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
          style={{ height: '500px' }}
        />
      </Stack>
    </Box>
  );
};

export default ProfessionalProfile;
