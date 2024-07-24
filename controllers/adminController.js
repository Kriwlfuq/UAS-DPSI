const { createTransaction, getTransactionsByUser } = require('../models/transactionsModel');

const addTransaction = async (req, res) => {
  try {
    const transaction = await createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const viewTransactions = async (req, res) => {
  try {
    const transactions = await getTransactionsByUser(req.params.userId);
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addTransaction,
  viewTransactions,
};
