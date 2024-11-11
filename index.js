require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const https = require('https');
const http = require('http');
const fs = require('fs');

const app = express()
const connectionStrDb = process.env.DATABASE_URL;

mongoose.connect(connectionStrDb)
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
    dbstatus = "connected to db"
})

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb",  extended: true, parameterLimit: 9000000 }));
app.use(cors())
app.use(express.json());

const sessionRoutes = require("./routes/sessionRoute.js")

app.get('/',(req,res)=>{
    res.json("Hello world!")
})

app.use('/session',sessionRoutes)

app.listen(3000,(err)=>{
    console.log('server running on port number 3000')
})