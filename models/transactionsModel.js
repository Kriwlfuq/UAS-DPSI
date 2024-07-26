const { db } = require('../config/database');

const createTransaction = async (data) => {
  const newTransaction = await db.collection('transactions').add(data);
  return { id: newTransaction.id, ...data };
};

const getTransactionsByUser = async (userId) => {
  const transactionsSnapshot = await db.collection('transactions').where('userId', '==', userId).get();
  const transactions = transactionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return transactions;
};

const updateTransaction = async (transactionId, data) => {
  const transactionRef = db.collection('transactions').doc(transactionId);
  await transactionRef.update(data);
  const updatedTransaction = await transactionRef.get();
  return { id: transactionId, ...updatedTransaction.data() };
};

const deleteTransaction = async (transactionId) => {
  await db.collection('transactions').doc(transactionId).delete();
};

module.exports = {
  createTransaction,
  getTransactionsByUser,
  updateTransaction,
  deleteTransaction
};
