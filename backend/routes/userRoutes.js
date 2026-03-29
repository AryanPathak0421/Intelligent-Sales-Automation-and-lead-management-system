const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile, getAgents, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/').post(protect, admin, registerUser);
router.route('/agents').get(protect, admin, getAgents);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;
