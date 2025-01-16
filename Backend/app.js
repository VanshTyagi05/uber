const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');
const cookieParser=require("cookie-parser");
const app=express();
const connecttodb=require('./db/db.js');
const userRoutes=require('./routes/user.routes.js');

connecttodb();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/user',userRoutes);
app.use(cookieParser());

app.get('/',(req, res) => {
    res.send('Hello World');
});

module.exports = app;