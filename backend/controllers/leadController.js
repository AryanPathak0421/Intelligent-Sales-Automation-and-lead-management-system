const Lead = require('../models/Lead');
const assignLeadToAgent = require('../utils/assignmentLogic');
const calculateLeadScore = require('../utils/scoringLogic');

// @desc    Capture lead from forms
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
    try {
        const { name, email, phone, source, region } = req.body;

        const leadExists = await Lead.findOne({ email });
        if (leadExists) {
            return res.status(400).json({ message: 'Lead already exists' });
        }

        const lead = new Lead({
            name,
            email,
            phone,
            source: source || 'Website',
            region: region || 'Unknown',
            activityLogs: [{ action: 'Capture' }],
        });

        // Lead assignment logic (Assigning to an agent)
        const assignedAgentId = await assignLeadToAgent(lead);
        lead.assignedTo = assignedAgentId;

        // AI-based Lead Scoring (Initial)
        lead.score = calculateLeadScore(lead);

        const savedLead = await lead.save();

        res.status(201).json(savedLead);
    } catch (error) {
        console.error('CREATE LEAD ERROR:', error);
        res.status(500).json({
            message: 'Lead creation halted by Internal Error',
            details: error.message
        });
    }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private (Admin/Sales Agent)
const getLeads = async (req, res) => {
    try {
        const query = req.user.role === 'Admin' ? {} : { assignedTo: req.user._id };
        const leads = await Lead.find(query).populate('assignedTo', 'name email');
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update lead status (Pipeline stages)
// @route   PUT /api/leads/:id/status
// @access  Private
const updateLeadStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        lead.status = status;
        lead.activityLogs.push({ action: `Status changed to ${status}` });

        // Recalculate score on activity
        lead.score = calculateLeadScore(lead);

        await lead.save();
        res.json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add interaction to lead
// @route   POST /api/leads/:id/interactions
// @access  Private
const addInteraction = async (req, res) => {
    try {
        const { type, details } = req.body;
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        lead.interactions.push({
            type,
            details,
            agent: req.user._id,
        });

        lead.activityLogs.push({ action: `${type} Interaction logged` });

        // Interaction boosts score
        lead.score = calculateLeadScore(lead);

        await lead.save();
        res.json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private (Admin)
const deleteLead = async (req, res) => {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
        await Lead.deleteOne({ _id: req.params.id });
        res.json({ message: 'Lead removed Intelligence' });
    } else {
        res.status(404).json({ message: 'Lead node not found' });
    }
};

module.exports = {
    createLead,
    getLeads,
    updateLeadStatus,
    addInteraction,
    deleteLead,
};
