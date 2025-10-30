import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
export const TypeChairsContext = createContext();

function TypeChairProvider({ children }) {
    const [typechairs, setTypeChairs] = useState([]);

    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("typechairs", (typechairsList) => {
            setTypeChairs(typechairsList);
        })
        return () => unsubscribe();
    }, []);
    return (
        <TypeChairsContext.Provider value={typechairs}>
            {children}
        </TypeChairsContext.Provider>
    );
}

export default TypeChairProvider;