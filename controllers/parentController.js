const { getTransactionsByUser } = require('../models/transactionsModel');

const viewTransactions = async (req, res) => {
  try {
    const transactions = await getTransactionsByUser(req.user.id);
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  viewTransactions,
};
