const bcrypt = require('bcryptjs');
const { db } = require('../config/database');

const register = (role) => async (req, res) => {
  const { username, password } = req.body;

  // Log untuk debugging
  console.log('Received request body:', req.body);

  try {
    // Validate input
    if (!username || !password) {
      console.log('Validation failed: Username or password missing');
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if user already exists
    console.log(`Checking if user ${username} with role ${role} already exists...`);
    const userSnapshot = await db.collection('users')
      .where('username', '==', username)
      .where('role', '==', role)
      .get();

    if (!userSnapshot.empty) {
      console.log(`User ${username} with role ${role} already exists.`);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    console.log(`Hashing password for user ${username}...`);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      username,
      password: hashedPassword,
      role,
    };
    console.log(`Creating new user ${username} with role ${role}...`);
    await db.collection('users').add(newUser);

    console.log(`User ${username} registered successfully with role ${role}.`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(`Error registering user: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

exports.registerAdmin = register('admin');
exports.registerTU = register('tu');
exports.registerParent = register('parent');
