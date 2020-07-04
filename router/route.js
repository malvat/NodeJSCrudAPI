const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const model = require('../models/model');

router.post("/addUser", async (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password) {
        res.send({
            error: 1,
            output: "parameters not provided"
        })
    } else {
        var old_user = await model.User.findOne({ email: req.body.email });
        if(old_user) {
            res.send({
                error: 1,
                output: "user already exists",
            })
        } else {
            var new_user = new model.User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
    
            new_user.save().then((result)=>{
                res.send({
                    error: 0,
                    output: "operation was sucessful",
                    data: result,
                })
            });
        }
    }
})

router.post("/viewUser", controller.viewUser)

router.get("/", (req, res) => {
    res.send({
        error: 0,
        output: "welcome to simple crud API built by Anim Malvat"
    })
})

 module.exports = router;