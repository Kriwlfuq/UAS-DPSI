const express = require('express');
const { addTransaction, viewTransactions } = require('../controllers/adminController');
const router = express.Router();

router.post('/transactions', addTransaction);
router.get('/transactions/:userId', viewTransactions);

module.exports = router;
