import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const orderDetailsContext = createContext()
function OrderDetailsProvider({children}) {
    const [orderDetails, setOrderDetails] = useState([]);
    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("OrderDetails", (orderItem) => {
            setOrderDetails(orderItem)
        })
        return () => unsubscribe();
    })
    return (
        <div>
            <orderDetailsContext.Provider value={orderDetails}>
                  {children}
            </orderDetailsContext.Provider>
        </div>
    );
}

export default OrderDetailsProvider;