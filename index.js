require('dotenv').config();
const express = require('express');
const app  = express();
const mongoose = require('mongoose');
const model = require('./models/model');
const router = require('./router/route');
const bodyParser = require('body-parser');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
} ,()=>{
    console.log("database connected, man");
})

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use('/', router);

app.listen(8000, ()=> {
    console.log("server is running now");
})