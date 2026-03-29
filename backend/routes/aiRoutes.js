const express = require('express');
const router = express.Router();
const { chatbotInteract } = require('../controllers/aiController');

router.post('/chat', chatbotInteract);

module.exports = router;
