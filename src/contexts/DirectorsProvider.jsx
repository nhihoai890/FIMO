import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const DirectorsContext = createContext();

function DirectorsProvider({ children }) {
    const [director, setDirector] = useState([]);

    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("directors", (directorList) => {
            setDirector(directorList);
        })

        return () => unsubscribe();
    }, []);

    return (
        <DirectorsContext.Provider value={director}>
            {children}
        </DirectorsContext.Provider>
    );
}

export default DirectorsProvider;