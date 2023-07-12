const express = require('express');
const {register, login,appointment} = require('../controllers/userController');
const {protect}= require("../middleware/authMiddleware")
 const router= express.Router();

 router.route('/').post(register)
 router.route('/login').post(login)
 router.route('/appointment').post(protect,appointment)
 module.exports = router