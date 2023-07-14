const express = require('express');
const {protect}= require("../middleware/authMiddleware")
const { searchCatagories, catagoriesRegistration,updateCatagories,vendorDetails } = require('../controllers/vendorController');
const router = express.Router();

router.route('/').post(protect,catagoriesRegistration)
router.route('/groupupdate').put(protect,updateCatagories);
router.route('/catagories').get(searchCatagories);
router.route('/detail').post(vendorDetails);

module.exports = router;


