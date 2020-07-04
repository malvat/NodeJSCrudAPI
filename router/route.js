const router = express.Router();
const model = require('../models/model');


router.post("/addUser", (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password) {
        res.send({
            error: 1,
            output: "parameters not provided"
        })
    } else {
        var new_user = new model.User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        new_user.save().then(()=>{
            res.send({
                error: 0,
                output: "operation was sucessful",
            })
        });
    }
 })

 exports.router = router;