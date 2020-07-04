const model = require('../models/model');

/**
 * home request for the web
 * @param {json} req requestion object
 * @param {json} res response object
 */
module.exports.home = (req, res) => {
    res.send({
        error: 0,
        output: "welcome to simple crud API built by Anim Malvat"
    })
}

/**
 * adding user to the mongodb
 * @param {json} req request object
 * @param {json} res response object
 */
module.exports.addUser = async (req, res) => {
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
}

/**
 * fecthing user from the mongodb
 * @param {json} req request object 
 * @param {json} res response object 
 */
module.exports.viewUser = (req, res)=>{
    if(!req.body.email) {
        res.send({
            error: 1,
            output: "provide email as parameter",
        })
    } else {
        model.User.findOne({
            email: req.body.email
        }).then(result => {
            if(result) {
                res.send({
                    error: 0,
                    output: "result was found",
                    data: result,
                })
            } else {
                res.send({
                    error: 1,
                    output: "result was not found",
                })
            }
        }).catch(err => {
            res.send({
                error: 1,
                output: "there was some error fetching the data",
            })
        })
    }
}

module.exports.editUser = (req, res) => {
    if(!req.body.old_email || !req.body.new_email) {
        res.send({
            error: 1,
            output: "please provide valid information",
        })
    } else {
        var update = {};
        if(req.body.name) {
            update['name'] = req.body.name;
        } 
        if(req.body.new_email) {
            update['email'] = req.body.new_email;
        }
        if(req.body.password) {
            update['password'] = req.body.password;
        }

        model.User.findOneAndUpdate({
            email: req.body.old_email,
        }, update).then(result => {
            res.send({
                error: 0,
                output: "document was updated",
            })
        }).catch(err => {
            res.send({
                error: 1,
                output: "document was not found",
            })
        })

    }
}