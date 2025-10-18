const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <-- 1. Imports CORS
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors()); // <-- 2. THIS IS THE FIX. It allows all requests.
app.use(express.json()); // Allows the server to understand JSON

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- API Routes ---
// (These must come AFTER app.use(cors()))
app.use('/api/admin', require('./routes/admin'));
app.use('/api/doctors', require('./routes/doctors'));

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});