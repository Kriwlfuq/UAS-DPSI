const admin = require("firebase-admin");
const dotenv = require('dotenv');

// Load variabel lingkungan dari file .env
dotenv.config();

// Parse string JSON dari variabel lingkungan
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };
