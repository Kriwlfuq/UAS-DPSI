// routes/registerRoutes.js
const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.post('/admin', registerController.registerAdmin);
router.post('/tu', registerController.registerTU);
router.post('/parent', registerController.registerParent);

module.exports = router;
