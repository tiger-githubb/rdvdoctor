import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Divider,
  Stack
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { professionalsData } from '../../../services/professionalData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

const localizer = momentLocalizer(moment);

const ProfessionalProfile: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { id } = useParams<{ id: string }>();

  if (id === undefined) {
    return <div>Identifiant du professionnel non spécifié.</div>;
  }

  const professional = professionalsData.find(prof => prof.id === parseInt(id, 10));

  if (!professional) {
    return <div>Professionnel non trouvé.</div>;
  }

 

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const availabilityData = [
    new Date('2023-08-25'),
    new Date('2023-08-26'),
    new Date('2023-08-27'),

  ];

  return (
    <Box p={4}>
      <Flex direction="column" align="center" py={8}>
        <Image src={professional.avatarUrl} alt={professional.name} boxSize="200px" borderRadius="full" />
        <Heading mt={4} fontSize="xl">
          {professional.name}
        </Heading>
        <Text color="gray.600">{professional.specialty}</Text>
        <Text color={'gray.300'}>{professional.location}</Text>
        <Button mt={4} colorScheme="pink">
          Prendre un rendez-vous
        </Button>
      </Flex>
      <Divider my={6} />

      <Stack spacing={4}>

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
          style={{ height: '500px' }}
        />
      </Stack>

    </Box>
  );
};

export default ProfessionalProfile;
