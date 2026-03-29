const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
    type: { type: String, enum: ['Call', 'Email', 'Meeting', 'Note'], required: true },
    details: { type: String, required: true },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now }
});

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    source: { type: String, default: 'Website' },
    status: { type: String, enum: ['New Lead', 'Contacted', 'Qualified', 'Converted'], default: 'New Lead' },
    score: { type: Number, default: 0 },
    classification: { type: String, enum: ['Hot', 'Warm', 'Cold'], default: 'Cold' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    region: { type: String },
    interactions: [interactionSchema],
    activityLogs: [{
        action: String,
        timestamp: { type: Date, default: Date.now }
    }],
}, { timestamps: true });

leadSchema.pre('save', function () {
    if (this.score >= 80) {
        this.classification = 'Hot';
    } else if (this.score >= 40) {
        this.classification = 'Warm';
    } else {
        this.classification = 'Cold';
    }
});

module.exports = mongoose.model('Lead', leadSchema);
