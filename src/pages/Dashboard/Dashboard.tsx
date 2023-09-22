import React, { useEffect, useState } from "react";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Profile from "./DashboardComponents/Profile";
import UpdateProfileForm from "./DashboardComponents/UpdateProfileForm";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import MedicalFileUpload from "./DashboardComponents/MedicalFileUpload";

const Dashboard: React.FC = () => {
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
    <Box p={2} mt={20}>
      <Profile userData={userData} loading={loading} />
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Modification des informations</Tab>
          <Tab>Dossier Medical</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          <UpdateProfileForm userData={userData} />
          </TabPanel>
          <TabPanel>
          <MedicalFileUpload userData={userData} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Dashboard;
