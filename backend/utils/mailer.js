const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const message = {
            from: `Sales Automation <noreply@salesauto.com>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
        };

        const info = await transporter.sendMail(message);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Email failed to send:', error.message);
    }
};

module.exports = sendEmail;
