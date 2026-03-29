const calculateLeadScore = (lead) => {
    let score = 0;

    // Safety check for lead object
    if (!lead) return 0;

    // Based on source
    const source = lead.source || 'Website';
    if (source === 'Website') score += 20;
    else if (source === 'Form') score += 15;
    else if (source === 'Social Media') score += 10;

    // Based on interaction count
    // Safety check for interactions array
    const interactions = lead.interactions || [];
    score += interactions.length * 5;

    // Based on specific activity (simulated activity logs)
    // Safety check for activityLogs array
    const activityLogs = lead.activityLogs || [];
    activityLogs.forEach(log => {
        if (log.action === 'Click') score += 2;
        if (log.action === 'Form Submission') score += 10;
        if (log.action === 'Email Opened') score += 5;
    });

    return Math.min(score, 100);
};

module.exports = calculateLeadScore;
