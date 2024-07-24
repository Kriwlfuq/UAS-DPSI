const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db } = require('../config/database');
const config = require('../config/config');

const login = (role) => async (req, res) => {
  const { username, password } = req.body;

  try {
    const userSnapshot = await db.collection('users').where('username', '==', username).where('role', '==', role).get();
    if (userSnapshot.empty) return res.status(400).json({ message: 'Invalid username or password' });

    const user = userSnapshot.docs[0].data();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginAdmin = login('admin');
exports.loginTU = login('tu');
exports.loginParent = login('parent');
