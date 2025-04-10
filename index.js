const http = require('http');
const fs = require('fs');
const url = require('url');
const myServer = http.createServer((req, res) => {
    const log = `${Date.now()} : ${req.url} : New req received!\n`
    const myUrl  =  url.parse(req.url, true);
    console.log(myUrl);
    // fs.appendFile("log.txt",log,(err,data)=>{
    //     res.end('Hello Server! Again');
    // });
    switch (req.url) {
        case '/':
            res.end('<h1>Hello from the server!</h1>');
            break;
        case '/about':
            const username = myUrl.query.name;
            res.end(`<p>Hello ${username}</p>`);
            break;
        case '/contact':
            res.end('<h1>Contact Us</h1>');
            break;
    }
});
myServer.listen(1000, () => {
    console.log('Server is running on port 1000');
})