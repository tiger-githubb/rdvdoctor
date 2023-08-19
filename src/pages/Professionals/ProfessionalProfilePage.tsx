import React from 'react';
import { useParams } from 'react-router-dom'; // Si vous utilisez React Router
import ProfessionalProfile from './ProfessionalComponents/ProfessionalProfile';

const ProfessionalProfilePage: React.FC = () => {
  const { professionalId } = useParams(); // Récupérez l'ID du professionnel depuis les paramètres d'URL

  // Ici, vous devrez récupérer les données du professionnel en fonction de son ID
  const professionalData = {
    id: professionalId,
    name: 'Dr. Jean Dupont',
    specialty: 'Dentiste',
    location: 'Paris, France',
    avatarUrl: 'lien_vers_avatar',
    description: 'Description du professionnel...',
  };

  return (
    <div>
 
      <ProfessionalProfile {...professionalData} />
    </div>
  );
};

export default ProfessionalProfilePage;
