const express = require('express');
const server = express();

const carRouter = require('./router/cars');

server.use(express.json());
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

server.use('/api/cars', carRouter);

module.exports = server;
