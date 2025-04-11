const express = require('express');
const users = require("./MOCK_DATA.json");
const app = express();
const port = 1000;
app.get('/api/users', (req, res) => {
    return res.json({ users });
});

app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map(users => `<li>${users.first_name}</li>`).join('')} // this will return the first name of all users in the list
    </ul>
    `;
    res.send(html);
});

// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json({ user }); // this will return the user object with the given id
// });

app
  .route('/api/users/:id') //make routes of same type together having different methods
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json({ user });
  })
    .put((req, res) => {
        return res.json({ status : "Pending" }); 
    })
    .patch((req, res) => {
        return res.json({ status : "Editing" }); 
    })
    .delete((req, res) => {
        return res.json({ status : "Deleting" }); 
    });

app.listen
(port, () => {
    console.log(`Server is running on port ${port}`);
});
