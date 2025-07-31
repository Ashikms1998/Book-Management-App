# Book-Management-App

Book Management App
A full-stack book management application built as a practical test for a MERN Stack Developer role. This application allows users to register, log in, and manage  list of books, including adding books, getting books,  login user and signup user.

🚀 Deployed Application
Frontend (React.js): https://book-management-app-iota.vercel.app/login

Backend (Node.js/Express.js): Deployed on Render. The API is hosted at a URL like https://book-management-app-wdgl.onrender.com.

✨ Features
User Authentication: Secure registration and login using JWT (JSON Web Tokens).

Book Management: Authenticated users can view, add books.

Protected Routes: Only logged-in users can access the main book list and management pages.

Responsive UI: A clean, user-friendly interface built with Material-UI, compatible with both desktop and mobile devices.

💻 Technologies Used
Frontend
React.js: A JavaScript library for building user interfaces.

React Router DOM: For client-side routing.

Axios: A promise-based HTTP client for making API requests.

React Context API: For global state management (Authentication and Book data).

Material-UI: A popular React UI framework for a polished, modern look.

Vite: A fast build tool for the frontend.

Backend
Node.js & Express.js: A robust and flexible framework for building the server-side application.

MongoDB & Mongoose: A NoSQL database and an ODM (Object Data Modeling) library for managing schemas.

bcrypt.js: For hashing user passwords.

express-validator: Middleware for validating incoming request data.

jsonwebtoken: For creating and verifying JWTs for authentication.

cors: Middleware to enable Cross-Origin Resource Sharing.

🔧 Prerequisites
To run this project locally, you need to have the following installed:

Node.js (v14 or higher)

npm (usually comes with Node.js) 

A running instance of MongoDB (local or MongoDB Atlas)

⚙️ Setup and Installation
Follow these steps to get the application up and running on your local machine.

1. Clone the repository
git clone https://github.com/Ashikms1998/Book-Management-App
cd Book-Management-App

2. Backend Setup
Navigate into the server directory and install the dependencies.

cd server
npm install

Create a .env file in the server directory and add the following variables. Replace the placeholder values with your own.

MONGO_URI = mongodb+srv://ashik:nQFrZtx3waZj8OFR@mern-auth2.8gyesqv.mongodb.net/oauth2?retryWrites=true&w=majority&appName=mern-auth2
PORT = 5000
JWT_SECRET = BooksManagementKey

To find your MONGO_URI, you can use MongoDB Atlas or follow local setup guides.

Start the backend server:

npm start

The backend will run on http://localhost:5000.

3. Frontend Setup
Open a new terminal, navigate into the client directory, and install dependencies.

cd ../client
npm install

Create a .env file in the client directory and set the URL for your backend API.

VITE_REACT_APP_API_BASE_URL=http://localhost:5000/api

For local development, this will be http://localhost:5000. When deploying, this should be your live backend URL (e.g., https://my-book-app-backend.onrender.com).

Start the frontend development server:

npm run dev

The frontend will open in your browser, typically at http://localhost:5173.

📖 Usage
Registration: On the login page, click the "Register" button to create a new user account.

Login: Use your registered email and password to log in.

Book Management: After logging in, you will be redirected to the book list page where you can:

View all books you have added.

Click the "Add Book" button to add a new book.
