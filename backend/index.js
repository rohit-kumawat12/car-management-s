require("dotenv").config();
const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cars', require('./routes/cars'));

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)
})