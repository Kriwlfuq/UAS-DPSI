const db = require('../config/database');

const createTransaction = async (transaction) => {
  const res = await db.collection('transactions').add(transaction);
  return res.id;
};

const getTransactionsByUser = async (userId) => {
  const transactionsRef = db.collection('transactions');
  const snapshot = await transactionsRef.where('userId', '==', userId).get();

  if (snapshot.empty) {
    return [];
  }

  const transactions = [];
  snapshot.forEach(doc => {
    transactions.push({ id: doc.id, ...doc.data() });
  });

  return transactions;
};

module.exports = {
  createTransaction,
  getTransactionsByUser,
};
