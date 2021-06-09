const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const dashboardRouter = require('./dashboardRouter')

router.use('/', authRouter);
router.use('/dashboard', dashboardRouter);

module.exports = router;
