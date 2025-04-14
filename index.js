const express = require('express');
const fs = require('fs');
const { type } = require('os');
const app = express();
const port = 1000;
const mongoose = require('mongoose');

// Connect to MongoDB  
mongoose.connect("mongodb://127.0.0.1:27017/youtube_app").then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.log("MongoDB connection failed", err));

//Create a Mongoose schema for the user
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    job_title: {
        type: String,
    },
    gender: {   
        type: String,
    },
},
{timestamps: true} // createdAt and updatedAt fields will be added automatically
);

// Create a Mongoose model for the user schema
const User = mongoose.model('user', userSchema);

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
app.route('/api/users/:id')
    .get(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json({ user });
    })
    .patch(async(req, res) => {
        // const id = Number(req.params.id);
        await User.findByIdAndUpdate(req.params.id, {last_name: "Mishra"});
        return res.json({ status: "User updated"});
    });

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET: Return all users as JSON
app.get('/api/users', async(req, res) => {
    const allDbUsers= await User.find({});
    res.setHeader("X-MyName", "Harshit Gupta") //always add X to custom header
    return res.json({ allDbUsers });
});

// POST: Add a new user
app.post("/api/users",async(req, res) => {
    const body = req.body;

    if (!body  || !body.first_name ||!body.last_name || !body.email || !body.job_title  || !body.gender) {
        return res.status(400).json({ error: "Invalid request body" });
    }

   const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title,
    });
// console.log("result", result);
return res.status(201).json({ msg: "success"});
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//all about the routes and method of postman