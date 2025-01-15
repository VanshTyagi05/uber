const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');

const app=express();
const connecttodb=require('./db/db.js');

connecttodb();
app.use(cors());
app.get('/',(req, res) => {
    res.send('Hello World');
})

module.exports = app;