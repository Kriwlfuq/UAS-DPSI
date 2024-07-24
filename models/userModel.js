const db = require('../config/database');

const getUserById = async (id) => {
  const userRef = db.collection('users').doc(id);
  const doc = await userRef.get();

  if (!doc.exists) {
    return null;
  }

  return { id: doc.id, ...doc.data() };
};

const createUser = async (user) => {
  const res = await db.collection('users').add(user);
  return res.id;
};

module.exports = {
  getUserById,
  createUser,
};
