import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const AccountContext = createContext();
function AccountProvider({ children }) {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("accounts", (accountList) => {
            setAccounts(accountList)
        });
        return () => unsubscribe();
    }, []);
    return (
        <AccountContext.Provider value={accounts}>
            {children}
        </AccountContext.Provider>
    );
}

export default AccountProvider;