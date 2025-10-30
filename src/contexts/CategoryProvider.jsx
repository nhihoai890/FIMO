import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const CategoriesContext = createContext();

function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
        const unsubscribe = fetchDocumentsRealtime("categories", (categoriesList) => {
            setCategories(categoriesList);
        });

        // Hủy lắng nghe khi component bị unmount
        return () => unsubscribe();
    }, []);

    return (
        <CategoriesContext.Provider value={categories}>
            {children}
        </CategoriesContext.Provider>
    );
}

export default CategoryProvider;