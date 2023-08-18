import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const appointments = [
  {
    id: 1,
    title: 'Meeting with Client',
    start: new Date(2023, 7, 20, 10, 0),
    end: new Date(2023, 7, 20, 12, 0),
  },
  // ... Ajoutez d'autres rendez-vous ici
];

const MyCalendar = () => {
  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '20px' }}
      />
    </div>
  );
};

export default MyCalendar;
