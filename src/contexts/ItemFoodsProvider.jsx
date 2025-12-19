import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const ItemFoodsContext = createContext();
function ItemFoodsProvider({children}) {
    const [itemFoods, setItemFoods] = useState([]);
    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("itemFoods", (itemFoodList) => {
            setItemFoods(itemFoodList);
        })
        return () => unsubscribe();
    })
    return (
        <div>
            <ItemFoodsContext.Provider value={itemFoods}>
                 {children}
            </ItemFoodsContext.Provider>
        </div>
    );
}

export default ItemFoodsProvider;