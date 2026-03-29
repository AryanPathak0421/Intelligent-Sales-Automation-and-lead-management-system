const cron = require('node-cron');
const Lead = require('../models/Lead');
const sendEmail = require('./mailer');

const runFollowUpScheduler = () => {
    // Check every minute for any reminders (Ideally daily but for demo we check frequently)
    cron.schedule('*/30 * * * *', async () => {
        console.log('Running lead follow-up scheduler check...');

        const pendingLeads = await Lead.find({ status: 'New Lead' })
            .populate('assignedTo');

        pendingLeads.forEach(async (lead) => {
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
            if (lead.createdAt < yesterday && lead.assignedTo) {
                // Send reminder to agent
                await sendEmail({
                    to: lead.assignedTo.email,
                    subject: `Follow-up Reminder: ${lead.name}`,
                    text: `Hello ${lead.assignedTo.name || 'Sales Rep'}, you have a lead ${lead.name} that has not been contacted for 24 hours.`,
                });
            }
        });
    });
};

module.exports = runFollowUpScheduler;
