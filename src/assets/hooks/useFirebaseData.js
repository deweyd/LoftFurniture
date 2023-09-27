import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const useFirebaseData = (collectionName) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyCjrFpvD5cmmQT28VsaCnjvXKlxtp6lEEA",
            authDomain: "newproject-9cd70.firebaseapp.com",
            databaseURL: "https://newproject-9cd70-default-rtdb.firebaseio.com",
            projectId: "newproject-9cd70",
            storageBucket: "newproject-9cd70.appspot.com",
            messagingSenderId: "229652802780",
            appId: "1:229652802780:web:054be34a9a7494ea8e1819",
            measurementId: "G-6YCSJ2GZ0N"
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
