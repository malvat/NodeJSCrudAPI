const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.post("/addUser", controller.addUser);
router.post("/viewUser", controller.viewUser);
router.post("/editUser", controller.editUser);
router.get("/", controller.home);

module.exports = router;