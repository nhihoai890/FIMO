import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const CinemaContext = createContext();

export function CinemaProvider({ children }) {
    const [cinemas, setCinema] = useState([]);

    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("cinemas", (cinemaList) => {
            setCinema(cinemaList);
        });
        return () => unsubscribe();
    }, []);

    return (
        <CinemaContext.Provider value={cinemas}>
            {children}
        </CinemaContext.Provider>
    );
}
