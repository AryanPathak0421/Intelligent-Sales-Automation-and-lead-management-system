const calculateLeadScore = (lead) => {
    let score = 0;
    // Based on source
    if (lead.source === 'Website') score += 20;
    else if (lead.source === 'Form') score += 15;
    else if (lead.source === 'Social Media') score += 10;

    // Based on interaction count
    score += lead.interactions.length * 5;

    // Based on specific activity (simulated activity logs)
    lead.activityLogs.forEach(log => {
        if (log.action === 'Click') score += 2;
        if (log.action === 'Form Submission') score += 10;
        if (log.action === 'Email Opened') score += 5;
    });

    return Math.min(score, 100);
};

module.exports = calculateLeadScore;
