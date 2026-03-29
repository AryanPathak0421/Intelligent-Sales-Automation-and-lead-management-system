const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a user (Admin only)
// @route   POST /api/users
// @access  Private (Admin)
const registerUser = async (req, res) => {
    const { name, email, password, role, region, expertise } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
        region,
        expertise,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            region: user.region,
            token: generateToken(user._id),
        });
    } else {
        console.log(`AUTH DENIED: ${email} | User Found: ${!!user} | Password Match: ${user ? await user.matchPassword(password) : 'N/A'}`);
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Get all agents
// @route   GET /api/users/agents
// @access  Private (Admin)
const getAgents = async (req, res) => {
    const agents = await User.find({ role: 'Sales Agent' }).select('-password');
    res.json(agents);
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private (Admin)
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await User.deleteOne({ _id: req.params.id });
        res.json({ message: 'User/Agent decommissioned' });
    } else {
        res.status(404).json({ message: 'User entity not found' });
    }
};

module.exports = {
    registerUser,
    authUser,
    getUserProfile,
    getAgents,
    deleteUser,
};
