import React, { useEffect, useState } from 'react';
import ProfessionalProfile from './ProfessionalComponents/ProfessionalProfile';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';



const ProfessionalProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUserData = async () => {
          try {
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
          } catch (error) {
            console.error("Error fetching user data:", error);
            setLoading(false);
          }
        };

        fetchUserData();
      } else {
        console.log("l'utilisateur n'est pas connecté");
      }
    });
  }, []);
  return (
    <div>
      <ProfessionalProfile userData={userData} loading={loading} />
    </div>
  );
};

export default ProfessionalProfilePage;
