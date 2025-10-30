import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const MoviesContext = createContext()
function MovieProvider({ children }) {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("movies", (MoviesList) => {
            setMovies(MoviesList);
        });
        return () => unsubscribe();
    }, []);
    return (
        <MoviesContext.Provider value={movies}>
            {children}
        </MoviesContext.Provider>
    );
}

export default MovieProvider;