import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axiosInstance from '../axiosInstance'; // Our configured axios instance
import { useAuth } from './AuthContext'; // To potentially handle logout on 401 errors

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { logout } = useAuth();

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get('/books');
            setBooks(res.data);
        } catch (err) {
            console.error('Error fetching books:', err);
            setError(err.response?.data?.message || 'Failed to fetch books');
            if (err.response && err.response.status === 401) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    }, [logout]);

    const addBook = useCallback(async (bookData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.post('/books/addnewbook', bookData);
            setBooks((prevBooks) => [...prevBooks, res.data]);
            return { success: true, message: 'Book added successfully!' };
        } catch (err) {
            console.error('Error adding book:', err);
            setError(err.response?.data?.message || 'Failed to add book');
            if (err.response && err.response.status === 401) {
                logout();
            }
            return { success: false, message: err.response?.data?.message || 'Failed to add book' };
        } finally {
            setLoading(false);
        }
    }, [logout]);

    // Fetch books initially when the component mounts
    // This effect should only run if the user is authenticated,
    // which is implicitly handled by `PrivateRoute` wrapping the BookList/BookForm
    // We might want to trigger it from the BookList component directly for finer control.

    return (
        <BookContext.Provider value={{ books, loading, error, fetchBooks, addBook }}>
            {children}
        </BookContext.Provider>
    );
};

export const useBooks = () => useContext(BookContext);