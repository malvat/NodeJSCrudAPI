const model = require('../models/model');

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