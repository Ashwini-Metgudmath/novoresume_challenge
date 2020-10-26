'use strict';

const https = require('https');
const fs = require('fs');
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const users = require('./routes/users');
const PORT = 8080;

dotenv.config();

//console.log("entered app js");


app.use(cors());
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', users);

// const server = https.createServer({
//     key: fs.readFileSync('./certificates/private.key'),
//     cert: fs.readFileSync('./certificates/public.cert')
// }, app).listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));

app.listen(PORT, (err) => {
    if(err){
      console.log(`Error in connection ${err}`)
    }
    else{
      console.log(`Server listening on port: ${PORT}!`);
    }
      });
module.exports = app;

// If there is an unhandled promise rejection, we throw it and let the uncaughtException handler handle it
process.on('unhandledRejection', reason => {
    throw reason;
});

process.on('uncaughtException', reason => {
    if (reason) console.log(reason);
    process.exit(1);
});

// If the process is getting killed by CTRL+C, first close the server, before interrupting the process. Only then, exit with success code
process.on('SIGINT', () => {
    console.log('SIGINT signal received, closing the server');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

// If the process is getting terminated by a 'kill ${PID}' command, first close the server, before interrupting the process. Only then, exit with success code
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received, closing the server');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});



