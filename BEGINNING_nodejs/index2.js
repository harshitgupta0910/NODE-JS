const http = require('http');
// const fs = require('fs');
// const url = require('url');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello from the server!</h1>');
});
app.get('/about', (req, res) => {
    res.send('<h1>About Us</h1>'+'hey there!'+req.query.name + req.query.age);
});

app.listen(1000, () => {
    console.log('Server is running on port 1000');
});

// const myServer = http.createServer((req, res) => {
//     const log = `${Date.now()} : ${req.url} : New req received!\n`
//     const myUrl  =  url.parse(req.url, true);
//     console.log(myUrl);
//     // fs.appendFile("log.txt",log,(err,data)=>{
//     //     res.end('Hello Server! Again');
//     // });
//     switch (req.url) {
//         case '/':
//             res.end('<h1>Hello from the server!</h1>');
//             break;
//         case '/about':
//             const username = myUrl.query.name;
//             res.end(`<p>Hello ${username}</p>`);
//             break;
//         case '/contact':
//             res.end('<h1>Contact Us</h1>');
//             break;
//     }
// });

// const myServer = http.createServer(app);
// myServer.listen(1000, () => {
//     console.log('Server is running on port 1000');
// })