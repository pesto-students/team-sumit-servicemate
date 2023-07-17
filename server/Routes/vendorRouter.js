const express = require('express');
const {protect}= require("../middleware/authMiddleware")
const { searchCatagories, catagoriesRegistration,vendorDetails, searchService,ProviderDetails } = require('../controllers/vendorController');
const router = express.Router();

router.route('/').post(protect,catagoriesRegistration).put(protect,catagoriesRegistration)
router.route('/catagories').get(searchCatagories);
router.route('/detail').post(vendorDetails);
router.route('/serviceSearch').post(searchService);
//router.route("/add-employee").post("addEmployee")
//sercha thru service id
router.route('/servceProviderDetails').post(ProviderDetails)


module.exports = router;


