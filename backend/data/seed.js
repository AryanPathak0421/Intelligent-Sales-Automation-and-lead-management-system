const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Lead = require('../models/Lead');

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const users = [
    {
        name: 'Admin User',
        email: 'admin@salesauto.com',
        password: 'password123',
        role: 'Admin',
        region: 'Global',
    },
    {
        name: 'John Doe',
        email: 'john@salesauto.com',
        password: 'password123',
        role: 'Sales Agent',
        region: 'North America',
        expertise: ['Technology', 'Education'],
    },
    {
        name: 'Jane Smith',
        email: 'jane@salesauto.com',
        password: 'password123',
        role: 'Sales Agent',
        region: 'Europe',
        expertise: ['Real Estate', 'Healthcare'],
    }
];

const seedData = async () => {
    await connectDB();
    try {
        await User.deleteMany();
        await Lead.deleteMany();

        const createdUsers = [];
        for (const user of users) {
            const createdUser = await User.create(user);
            createdUsers.push(createdUser);
        }
        const john = createdUsers[1];
        const jane = createdUsers[2];

        const leads = [
            {
                name: 'Mark Taylor',
                email: 'mark@gmail.com',
                phone: '123-456-7890',
                source: 'Website',
                status: 'New Lead',
                region: 'North America',
                assignedTo: john._id,
                score: 85,
                classification: 'Hot',
                activityLogs: [{ action: 'Capture' }, { action: 'Click' }]
            },
            {
                name: 'Alice Cooper',
                email: 'alice@gmail.com',
                phone: '234-567-8901',
                source: 'Social Media',
                status: 'Contacted',
                region: 'Europe',
                assignedTo: jane._id,
                score: 45,
                classification: 'Warm',
                activityLogs: [{ action: 'Capture' }]
            },
            {
                name: 'Bob Ross',
                email: 'bob@gmail.com',
                phone: '345-678-9012',
                source: 'Form',
                status: 'Qualified',
                region: 'North America',
                assignedTo: john._id,
                score: 95,
                classification: 'Hot',
                activityLogs: [{ action: 'Capture' }, { action: 'Click' }, { action: 'Email Opened' }]
            }
        ];

        await Lead.insertMany(leads);

        console.log('Sample Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
