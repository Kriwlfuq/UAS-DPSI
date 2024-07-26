const express = require('express');
const { addTransaction, viewTransactions, editTransaction, removeTransaction } = require('../controllers/adminController');
const router = express.Router();

router.post('/transactions', addTransaction);
router.get('/transactions/:userId', viewTransactions);
router.put('/transactions/:transactionId', editTransaction);
router.delete('/transactions/:transactionId', removeTransaction);

module.exports = router;
