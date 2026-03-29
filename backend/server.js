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
app.use(cors({
    origin: function (origin, callback) {
        // Splitting env variable in case it contains multiple comma-separated URLs
        const envOrigins = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map(o => o.trim()) : [];
        const allowedOrigins = [
            'https://intelligent-sales-automation-and-le.vercel.app',
            'http://localhost:5173',
            ...envOrigins
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS BLOCK: Security Layer Triggered'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// CORS already handled by app.use(cors(...)) above
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
