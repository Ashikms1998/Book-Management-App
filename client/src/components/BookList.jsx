import React, { useEffect } from 'react';
import {
    Typography,
    CircularProgress,
    Box,
    Alert,
    Card,
    CardContent,
    Grid,
    Chip,
} from '@mui/material';
import { useBooks } from '../context/BookContext';

const BookList = () => {
    const { books, loading, error, fetchBooks } = useBooks();

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 64px)">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 4, px: 2 }}>
            <Typography variant="h4" className='font-tinos' component="h2" gutterBottom align="center">
                📚 Available Books
            </Typography>

            {books.length === 0 ? (
                <Typography variant="body1" align="center">No books found. Add some!</Typography>
            ) : (
                <Grid container spacing={3}>
                    {books.map((book) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    bgcolor: '#ffffff',
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom color="primary">
                                        {book.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mb={1}>
                                        by {book.author}
                                    </Typography>

                                    {book.genre && (
                                        <Chip
                                            label={book.genre}
                                            color="secondary"
                                            variant="outlined"
                                            size="small"
                                        />
                                    )}

                                    {/* Optional description or summary */}
                                    {book.description && (
                                        <Typography variant="body2" mt={1}>
                                            {book.description.slice(0, 100)}...
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default BookList;
