const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const contentRoutes = require('./routes/contentRoutes');
const unitRoutes = require('./routes/unitRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Enable pre-flight across the board
app.options('*', cors());

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/unit', unitRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('SMYM Backend is running...');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
