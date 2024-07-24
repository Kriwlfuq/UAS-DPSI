const { createTransaction, getTransactionsByUser } = require('../models/transactionsModel');
const { getUserById } = require('../models/userModel');

const addTransaction = async (req, res) => {
  try {
    const user = await getUserById(req.body.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const transaction = await createTransaction(req.body);
    res.status(201).json({ id: transaction });
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
