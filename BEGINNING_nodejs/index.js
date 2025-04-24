const express = require('express');
const fs = require('fs');
const { type } = require('os');
const app = express();
const port = 1000;
const mongoose = require('mongoose');

const userRouter = require('./routes/user'); // Import the user router

// Connect to MongoDB  
mongoose.connect("mongodb://127.0.0.1:27017/youtube_app").then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.log("MongoDB connection failed", err));

//get user via mongoose
app.get('/users', async(req, res) => {
    const allDbUsers= await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map(user => `<li>${user.first_name} - ${user.email}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});

// ROUTE: Handle /api/users/:id for GET, PATCH, DELETE


// Middleware to parse request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRouter); // Use the user router for all routes starting with /user

// GET: Return all users as JSON


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//all about the routes and method of postman