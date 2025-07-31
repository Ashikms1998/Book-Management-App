import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Alert } from '@mui/material';
import { useBooks } from '../context/BookContext';

const BookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [responseMessage, setResponseMessage] = useState({ type: '', text: '' });
    const { addBook, loading } = useBooks();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage({ type: '', text: '' }); // Clear previous messages

        if (!title || !author) {
            setResponseMessage({ type: 'error', text: 'Title and Author are required.' });
            return;
        }

        const result = await addBook({ title, author });
        if (result.success) {
            setResponseMessage({ type: 'success', text: result.message });
            setTitle('');
            setAuthor('');
        } else {
            setResponseMessage({ type: 'error', text: result.message });
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Add New Book
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                {responseMessage.text && (
                    <Alert severity={responseMessage.type} sx={{ width: '100%', mb: 2 }}>
                        {responseMessage.text}
                    </Alert>
                )}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Book Title"
                    name="title"
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="author"
                    label="Author Name"
                    name="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    disabled={loading}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Book'}
                </Button>
            </Box>
        </Box>
    );
};

export default BookForm;