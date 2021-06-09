const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const validate = require('../validators/postCallValidators');

router.get('/', authController.loginPage);

router.post('/login',validate.commonLogin, authController.commonLogin)




module.exports = router;
