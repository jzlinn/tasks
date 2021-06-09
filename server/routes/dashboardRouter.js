const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboardController');
const validate = require('../validators/postCallValidators');


router.get('/', dashboardController.dashboardPage);
router.get('/add/employ', dashboardController.addEmployForm);

router.post('/add/employ', validate.userCreation, dashboardController.saveNewEmploy);




module.exports = router;