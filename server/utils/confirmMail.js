const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');

module.exports = async (userId, email) => {
    const emailToken = jwt.sign(
        { _id: userId },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: '1d' }
    );

    const url = `http://localhost:8080/api/users/confirmation/${emailToken}`;

    await sendMail({
        email,
        subject: 'Email confirmation',
        message: `Click here to confirm your email: <br><a href="${url}">${url}</a>`
    });
}
