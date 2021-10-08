const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

module.exports = async ({ email, subject, message }) => {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: message
    }, (err, info) => {
        if (err) throw err;
    });
}
