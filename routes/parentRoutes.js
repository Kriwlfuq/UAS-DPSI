const express = require('express');
const { viewTransactions } = require('../controllers/parentController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.get('/transactions', authenticateToken, viewTransactions);

module.exports = router;
