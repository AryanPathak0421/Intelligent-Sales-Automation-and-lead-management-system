const express = require('express');
const router = express.Router();
const { createLead, getLeads, updateLeadStatus, addInteraction, deleteLead } = require('../controllers/leadController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(createLead)
    .get(protect, getLeads);

router.route('/:id').delete(protect, admin, deleteLead);
router.route('/:id/status').put(protect, updateLeadStatus);
router.route('/:id/interactions').post(protect, addInteraction);

module.exports = router;
