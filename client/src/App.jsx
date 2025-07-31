import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext'; // Import BookProvider
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';


// Basic Material-UI Theme (you can customize this further)
const theme = createTheme({
    palette: {
        primary: {
            main: '#000000', // A nice blue
        },
        secondary: {
            main: '#dc004e', // A contrasting color
        },
    },
    typography: {
    fontFamily: `'Tinos', serif`,
  },

  components: {
        MuiCssBaseline: {
            styleOverrides: {
                // Ensure html and body take full height for proper flex behavior
                html: {
                    height: '100%',
                },
                body: {
                    margin: 0,
                    padding: 0,
                    height: '100%', // Take full height of html
                    width: '100%',  // Take full width

                    // Your desired background image styles
                    backgroundImage: `url('/abc.jpg')`, // Path to your SVG in the public folder
                    backgroundSize: 'cover',        // Scale to cover the entire container
                    backgroundRepeat: 'no-repeat',  // Don't tile the image
                    backgroundPosition: 'center center', // Center the background image
                    backgroundAttachment: 'fixed',  // Keep background static when content scrolls
                    backgroundColor: '#f0f4f7', // Fallback color (if SVG fails or for contrast)

                    // Flexbox for main app layout: Navbar at top, content below
                    display: 'flex',
                    flexDirection: 'column', // Arrange children (Navbar, then main content box) in a column
                    backdropFilter: 'blur(2px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
            },
        },
    },

});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Resets CSS and provides a base */}
            <Router>
                {/* AuthProvider wraps everything to provide authentication context */}
                <AuthProvider>
                    <Navbar /> {/* Navbar outside of routes so it's always visible */}
                    <Container maxWidth="lg" sx={{ mt: 4 }}> {/* Main content container */}
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />

                            {/* Protected Routes (using PrivateRoute) */}
                            {/* Outlet in PrivateRoute will render the element if authenticated */}
                            <Route element={<PrivateRoute />}>
                                {/* BookProvider wraps protected book routes */}
                                <Route path="/" element={<BookProvider><BookList /></BookProvider>} />
                                <Route path="/add-book" element={<BookProvider><BookForm /></BookProvider>} />
                            </Route>

                            {/* Optional: Add a catch-all for 404 if desired */}
                            <Route path="*" element={<p>Page Not Found</p>} />
                        </Routes>
                    </Container>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;