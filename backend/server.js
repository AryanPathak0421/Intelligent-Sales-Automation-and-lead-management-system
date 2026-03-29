const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/db');
const runFollowUpScheduler = require('./utils/scheduler');
const runBackupScheduler = require('./utils/backup');

dotenv.config();
connectDB();
runFollowUpScheduler();
runBackupScheduler();

const app = express();

app.use(express.json());

// Robust CORS Configuration
const allowedOrigins = [
    'https://intelligent-sales-automation-and-le.vercel.app',
    'http://localhost:5173',
    ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map(o => o.trim()) : [])
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps/curl)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('CORS BLOCK: Security Layer Triggered'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(morgan('dev'));
app.use(helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false
}));

// Routes
const leadRoutes = require('./routes/leadRoutes');
const userRoutes = require('./routes/userRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/api/leads', leadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
