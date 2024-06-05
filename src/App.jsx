import HomePage from "./pages/HomePage"
import React, { useEffect } from 'react';
import { db } from './firebaseConfig.js';
import { collection, getDocs } from "firebase/firestore";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "yourCollectionName"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    };

    fetchData();
  }, []);

  return (
    <HomePage />
  );
}

export default App
