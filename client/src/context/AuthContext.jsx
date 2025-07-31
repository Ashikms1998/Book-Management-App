import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
        try {
              setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user data:", error);
            }
    }
    setLoading(false);
}, []);

const login = async (email, password) => {
        try {
            const res = await axiosInstance.post('/auth/login', { email, password });
            const { token, _id, name, email: userEmail } = res.data;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('user', JSON.stringify({ _id, name, email: userEmail }));
            setUser({ _id, name, email: userEmail, token });
            navigate('/');
            return { success: true };
        } catch (error) {

            console.error('Login error:', error.response ? error.response.data : error.message);

            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };


const register = async (username, email, password) => {
        try {
            const res = await axiosInstance.post('/auth/register', { username, email, password });
            navigate('/login');
            return { success: true, message: res.data.message };
        } catch (error) {
            console.error('Register error:', error.response ? error.response.data : error.message);
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };


const logout = () => {
        localStorage.clear();
        setUser(null);
        navigate('/login');
    };

return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);