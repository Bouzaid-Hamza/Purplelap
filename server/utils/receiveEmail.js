const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const mailStructure = (email, message) => (`
    from: ${email}
    message: 
    ${message}
`);

module.exports = async ({ email, subject, message }) => {
    await transporter.sendMail({
        from: email,
        to: process.env.EMAIL,
        subject: subject,
        text: mailStructure(email, message)
    }, (err, data) => {
        if (err) throw err;
    });
}
