import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const CitiesContext = createContext();

function CitiesProvider({ children }) {

    const [cities, setCities] = useState([]);

    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("cities", (citiesList) => {
            setCities(citiesList);
        });
        return () => unsubscribe();
    }, []);
    return (
        <div>
            <CitiesContext.Provider value={cities}>
                {children}
            </CitiesContext.Provider>
        </div>
    );
}

export default CitiesProvider;