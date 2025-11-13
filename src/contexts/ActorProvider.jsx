import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';



export const ActorsContext = createContext();

function ActorProvider({ children }) {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("actors", (actorList) => {
            setActors(actorList);
        });
        return () => unsubscribe();

    }, []);
    return (
        <ActorsContext.Provider value={actors}>
            {children}
        </ActorsContext.Provider>
    );
}

export default ActorProvider;