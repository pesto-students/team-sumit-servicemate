const express = require('express');
const {protect}= require("../middleware/authMiddleware")
const { searchCatagories, catagoriesRegistration,vendorDetails, searchService } = require('../controllers/vendorController');

const router = express.Router();

router.route('/').post(protect,catagoriesRegistration)
router.route('/catagories').get(searchCatagories);
router.route('/detail').post(vendorDetails);
router.route('/serviceSearch').post(searchService);


module.exports = router;


