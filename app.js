require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const parentRoutes = require('./routes/parentRoutes');
const tuRoutes = require('./routes/tuRoutes');
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require('./routes/registerRoutes');
const authenticateToken = require('./middleware/authenticateToken');
const errorHandler = require('./middleware/errorHandler');
const { admin, db } = require('./config/firebaseConfig');

const app = express();

// Middleware untuk body parsing
app.use(bodyParser.json());

// Rute utama
app.get('/', (req, res) => {
  res.send('API sudah berjalan...');
});

// Rute tanpa otentikasi
app.use('/auth', authRoutes);
app.use('/register', registerRoutes); // Menambahkan rute register

// Rute dengan otentikasi
app.use('/admin', authenticateToken, adminRoutes);
app.use('/parent', authenticateToken, parentRoutes);
app.use('/tu', authenticateToken, tuRoutes);

// Middleware untuk penanganan error
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
