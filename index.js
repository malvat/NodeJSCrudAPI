require('dotenv').config();
const express = require('express');
const app  = express();
const mongoose = require('mongoose');
const model = require('./models/model');
const router = require('./router/route');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} ,()=>{
    console.log("database connected, man");
})

app.get("/", (req, res) => {
    let instance = new model.User({
        name: "anim", 
        email: "malvat.anim0@gmail.com",
    });
    instance.save();
    res.send("user added");
})

app.use('/', router);

app.listen(8000, ()=> {
    console.log("server is running now");
})