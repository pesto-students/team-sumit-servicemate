const express = require('express');
const { register, login, appointment, fetchAppointment } = require('../controllers/userController');
const { protect } = require("../middleware/authMiddleware")
const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/appointment').post(protect, appointment)
router.route('/fetchappointment').get(protect, fetchAppointment)
module.exports = router