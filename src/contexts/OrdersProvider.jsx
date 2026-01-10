import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';


export const OrdersContenxt = createContext();

function OrdersProvider({ children }) {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("orders", (orderList) => {
            setOrders(orderList)
        })
        return () => unsubscribe();
    })
    return (
        <OrdersContenxt.Provider value={orders}>
            {children}
        </OrdersContenxt.Provider>
    );
}

export default OrdersProvider;