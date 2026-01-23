import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const BookingContext = createContext();
function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchDocumentsRealtime("bookings", (bookList) => {
      setBookings(bookList);
    })
    return () => unsubscribe();

  }, []);

  return (
    <div>
      <BookingContext.Provider value={bookings}>
        {children}
      </BookingContext.Provider>
    </div>
  );
}

export default BookingProvider;