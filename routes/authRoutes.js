const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/admin/login', authController.loginAdmin);
router.post('/tu/login', authController.loginTU);
router.post('/parent/login', authController.loginParent);

module.exports = router;
