const express = require('express');
const app  = express();
const mongoose = require('mongoose');
const model = require('./model');

const db_url = "mongodb://localhost/example";


mongoose.connect(db_url, {
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

app.listen(8000, ()=> {
    console.log("server is running now");
})