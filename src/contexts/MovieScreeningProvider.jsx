import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const MovieScreeningContext = createContext();

function MovieScreeningProvider({ children }) {
    const [movieScreens, setMovieScreens] = useState([]);

    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("movieSceens", (movieScreenList) => {
            setMovieScreens(movieScreenList);
        })
        return () => unsubscribe();
    }, [])
    return (
        <MovieScreeningContext.Provider value={movieScreens}>
            {children}
        </MovieScreeningContext.Provider>
    );
}

export default MovieScreeningProvider;