import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const CinemaLocationsContext = createContext();

function CinemaLocationProvider({ children }) {
    const [cinemaLocations, setCinemaLocations] = useState([]);
    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("cinemaLocations", (cinemaLocationList) => {
            setCinemaLocations(cinemaLocationList);
        })
        return () => unsubscribe();
    }, [])
    return (
        <CinemaLocationsContext.Provider value={cinemaLocations}>
            {children}
        </CinemaLocationsContext.Provider>
    );
}

export default CinemaLocationProvider;