import React, { useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
import { createContext } from 'react';
export const RoomsContext = createContext();
function RoomProvider({ children }) {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("rooms", (roomList) => {
            setRooms(roomList);
        });
        return () => unsubscribe
    }, [])
    return (
        <RoomsContext.Provider value={rooms}>
            {children}
        </RoomsContext.Provider>
    );
}

export default RoomProvider;