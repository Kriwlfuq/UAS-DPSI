const express = require('express');
const { addTransaction, viewTransactions } = require('../controllers/tuController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/transactions', authenticateToken, addTransaction);
router.get('/transactions/:userId', authenticateToken, viewTransactions);

module.exports = router;
