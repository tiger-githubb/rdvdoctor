import React from 'react';
import { useParams } from 'react-router-dom'; // Si vous utilisez React Router
import ProfessionalProfile from './ProfessionalComponents/ProfessionalProfile';
import { professionalsData } from '../../services/professionalData';

const ProfessionalProfilePage: React.FC = () => {
  const { professionalId } = useParams(); // Récupérez l'ID du professionnel depuis les paramètres d'URL

  // Ici, vous devrez récupérer les données du professionnel en fonction de son ID
  const professionalData = {
    id: professionalId,
    name: 'Dr. Jean Dupont',
    specialty: 'Dentiste',
    avatarUrl: 'lien_vers_avatar',

  };



  return (
    <div>
      {/* <ProfessionalProfile {...professionalData} /> */}
      <ProfessionalProfile />
    </div>
  );
};

export default ProfessionalProfilePage;
