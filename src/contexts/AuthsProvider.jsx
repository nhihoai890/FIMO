import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
function AuthsProvider({ children }) {
    const [isLogin, setIsLogin] = useState(null);
    const navigate = useNavigate();

    const loginContext = (userData) => {
        setIsLogin(userData);
        localStorage.setItem('login', JSON.stringify(userData))
    }
    const logout = () => {
        setIsLogin(null);
        localStorage.removeItem('login');
        navigate("/main");
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('login');
        if (storedUser) {
            setIsLogin(JSON.parse(storedUser))
        }
    }, [])
    return (
        <AuthContext.Provider value={{ loginContext , isLogin , logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthsProvider;