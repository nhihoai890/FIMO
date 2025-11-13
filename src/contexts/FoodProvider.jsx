import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
export const FoodsContext = createContext();
function FoodProvider({ children }) {
    const [foods, setFoods] = useState([]);
    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("foods", (foodList) => {
            setFoods(foodList);
        })
        return () => unsubscribe();
    }, [])
    return (
        <FoodsContext.Provider value={foods}>
            {children}
        </FoodsContext.Provider>
    );
}

export default FoodProvider;