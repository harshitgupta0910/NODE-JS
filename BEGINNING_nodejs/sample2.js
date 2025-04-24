const fs = require('fs');  //file system module
const os = require('os'); 
console.log(os.cpus().length); //i have 12 cpus

// fs.writeFileSync('./sample.txt', 'Hello World! Sync') //syncronous
// fs.writeFile('./sample.txt', 'Hello World! Async', (err) => {})//asyncronous

// fs.readFileSync('./contact.txt', 'utf-8') //synchronous
// fs.readFile('./contact.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data); 
//     console.log("File read successfully!")
// })//asynchronous

// fs.appendFileSync('./sample.txt', `Hello World! Sync ${Date.now()}\n`) //syncronous for add in file 

// fs.cpSync('./sample.txt', './copied.txt') //copy file synchronously
// fs.unlinkSync('./copied.txt') //delete file synchronously
// console.log(fs.statSync('./sample.txt')) //get file status synchronously
fs.mkdirSync("mynewfolder/a/b",{recursive: true}) //create directory synchronously