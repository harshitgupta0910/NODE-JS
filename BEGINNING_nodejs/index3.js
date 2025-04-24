const express = require('express');
const users = require("./MOCK_DATA.json");
const fs = require('fs');
const app = express();
const port = 1000;

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET: Return all users as JSON
app.get('/api/users', (req, res) => {
    res.setHeader("myName", "Harshit")
    res.setHeader("X-MyName", "Harshit Gupta") //always add X to custom header
    return res.json({ users });
});

// GET: Return users as an HTML list
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});

// ROUTE: Handle /api/users/:id for GET, PATCH, DELETE
app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json({ user });
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }

        const updatedUser = {
            ...users[userIndex],
            ...req.body
        };

        users[userIndex] = updatedUser;

        fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2));
        return res.json({ status: "User updated", user: updatedUser });
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }

        users.splice(userIndex, 1);
        fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2));
        return res.json({ status: "User deleted" });
    });

// POST: Add a new user
app.post("/api/users", (req, res) => {
    const body = req.body;

    if (!body || typeof body !== 'object') {
        return res.status(400).json({ error: "Invalid request body" });
    }

    const newUser = {
        id: users.length + 1,
        ...body
    };

    users.push(newUser);
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2));
    return res.status(201).json({ status: "User added", user: newUser });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//all about the routes and method of postman