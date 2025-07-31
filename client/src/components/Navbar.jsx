import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookIcon from '@mui/icons-material/Book';
const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
    <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',

        }}>
            <BookIcon sx={{ mr: 1, fontSize: '1.8rem', color: 'primary.light' }} /> {/* Book icon */}
            <Typography
                variant="h5" // A bit larger for a prominent name
                className='font-tinos'
                component="span" // Use span to keep it inline with the icon
                sx={{
                    fontWeight: 700, // Make it bold
                    letterSpacing: 1.5, // Spread out letters slightly
                }}
            >
                Good Reads
            </Typography>
        </Box>
    </RouterLink>
</Typography>
                <Box>
                    {user ? (
                        <>
                            <Button color="inherit" component={RouterLink} to="/">Books</Button>
                            <Button color="inherit" component={RouterLink} to="/add-book">Add Book</Button>
                            <Button color="inherit" onClick={logout}>Logout ({user.name})</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                            <Button color="inherit" component={RouterLink} to="/register">Register</Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;