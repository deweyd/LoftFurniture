import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const useFirebaseData = (collectionName) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const firebaseConfig = {
            apiKey: process.env.REACT_APP_API_KEY,
            authDomain: process.env.REACT_APP_AUTH_DOMAIN,
            databaseURL: process.env.REACT_APP_DATA_BASE_URL,
            projectId: process.env.REACT_APP_PROJECT_ID,
            storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_MESSAGGING_SENDER_ID,
            appId: process.env.REACT_APP_APP_ID,
            measurementId: process.env.REACT_APP_MEASUREMENT_ID
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        const database = firebase.database();

        const collectionRef = database.ref(collectionName);

        const onDataChange = (snapshot) => {
            const collectionData = snapshot.val()
            if (collectionData) {
                const collectionArray = Object.values(collectionData)
                setData(collectionArray)
            } else {
                setData([])
            }
        }

        collectionRef.on('value', onDataChange)

        // collectionRef.on('value', snapshot => {
        //     const collectionData = snapshot.val();
        //     if (collectionData) {
        //         const collectionArray = Object.values(collectionData);
        //         setData(collectionArray);
        //     }
        // });

        return () => {
            collectionRef.off('value', onDataChange);
        };
    }, [collectionName]);


    return data;
};

export default useFirebaseData;
