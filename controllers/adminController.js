const { createTransaction, getTransactionsByUser, updateTransaction, deleteTransaction } = require('../models/transactionsModel');

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

const editTransaction = async (req, res) => {
  try {
    const updatedTransaction = await updateTransaction(req.params.transactionId, req.body);
    res.status(200).json(updatedTransaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeTransaction = async (req, res) => {
  try {
    await deleteTransaction(req.params.transactionId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addTransaction,
  viewTransactions,
  editTransaction,
  removeTransaction
};
