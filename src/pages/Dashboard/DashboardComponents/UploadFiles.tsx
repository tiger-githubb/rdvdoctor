import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { storage } from "../../../services/firebase";

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `uploads/${file.name}`);

      try {
        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);
        setFileUrl(downloadURL);

        const db = getFirestore();
        const uploadsCollection = collection(db, "uploads");
        await addDoc(uploadsCollection, { url: downloadURL });

        alert("Le fichier a été téléchargé avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'envoi du fichier : ", error);
        alert("Une erreur s'est produite lors de l'envoi du fichier.");
      }
    }
  };

  return (
    <div>
      <h2>Téléchargement de fichiers</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Envoyer</button>
      {fileUrl && (
        <div>
          <h3>Fichier téléchargé</h3>
          <img src={fileUrl} alt="Uploaded File" width="300" />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
