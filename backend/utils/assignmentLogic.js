const User = require('../models/User');

const assignLeadToAgent = async (lead) => {
    try {
        // Current agents with matching region and active status
        const agents = await User.find({
            role: 'Sales Agent',
            region: lead.region,
            active: true,
        }).sort({ workload: 1 }); // Least busy agent first

        if (agents.length === 0) {
            // Fallback: Agent from different region
            const fallbackAgents = await User.find({
                role: 'Sales Agent',
                active: true,
            }).sort({ workload: 1 });

            if (fallbackAgents.length === 0) return null;

            const assignedAgent = fallbackAgents[0];
            assignedAgent.workload += 1;
            await assignedAgent.save();

            return assignedAgent._id;
        }

        const assignedAgent = agents[0];
        assignedAgent.workload += 1;
        await assignedAgent.save();

        return assignedAgent._id;
    } catch (error) {
        console.error('Lead assignment failed:', error.message);
        return null;
    }
};

module.exports = assignLeadToAgent;
