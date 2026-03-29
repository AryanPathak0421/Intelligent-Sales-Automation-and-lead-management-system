const User = require('../models/User');

const assignLeadToAgent = async (lead) => {
    try {
        // Current agents with matching region and active status
        const agents = await User.find({
            role: 'Sales Agent',
            region: lead.region,
            active: true,
        }).sort({ workload: 1 }); // Least busy agent first

        let assignedAgent = null;

        if (agents.length > 0) {
            assignedAgent = agents[0];
        } else {
            // Fallback: Agent from different region
            const fallbackAgents = await User.find({
                role: 'Sales Agent',
                active: true,
            }).sort({ workload: 1 });

            if (fallbackAgents.length > 0) {
                assignedAgent = fallbackAgents[0];
            }
        }

        if (!assignedAgent) {
            return null;
        }

        // Ensure workload is a number before incrementing
        if (typeof assignedAgent.workload !== 'number' || isNaN(assignedAgent.workload)) {
            assignedAgent.workload = 0;
        }

        assignedAgent.workload += 1;
        await assignedAgent.save();

        return assignedAgent._id;
    } catch (error) {
        console.error('Lead assignment failed:', error.message);
        return null;
    }
};

module.exports = assignLeadToAgent;
