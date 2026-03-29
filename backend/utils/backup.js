const { exec } = require('child_process');
const cron = require('node-cron');
const path = require('path');
const fs = require('fs');

const runBackupScheduler = () => {
    // Weekly backup on Sunday at 2 AM
    cron.schedule('0 2 * * 0', () => {
        const backupDir = path.join(__dirname, '../backups');
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(backupDir, `db-backup-${timestamp}`);

        console.log(`Starting automated database backup: ${backupPath}`);

        // Note: Requires mongodump installed on the system
        const command = `mongodump --uri="${process.env.MONGO_URI}" --out="${backupPath}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Backup Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`Backup Status: ${stderr}`);
            }
            console.log(`Backup successfully completed at ${backupPath}`);
        });
    });
};

module.exports = runBackupScheduler;
