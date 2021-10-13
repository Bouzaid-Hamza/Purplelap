const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { User, validateUser } = require('../models/user');
const validate = require('../middlewares/validate');
const confirmMail = require('../utils/confirmMail');
const router = express.Router();
const admins = process.env.ADMINS.split(' ');

router.post('/', validate(validateUser), async (req, res) => {
    let { name, email, password } = req.body;

    let user = await User.findOne({ email }) || await User.findOne({ name });
    if (user) return res.status(400).send({ message: 'User already registered.' });

    password = await bcrypt.hash(password, 10);

    user = new User({ name, email, password });
    if (admins.includes(email)) user.setAdmin(true);

    await user.save();

    if (!user.isAdmin) {
        await confirmMail(user._id, email);
        return res.send({ message: 'One more step!! Please check your inbox to confirm your email.' });
    }

    res.send({ message: 'You are admin you dont need to confirm your email' });
});

router.get('/confirmation/:emailtoken', async (req, res) => {
    const { emailToken } = req.params;
    const { _id } = jwt.verify(emailToken, process.env.JWT_PRIVATE_KEY);

    const user = await User.findByIdAndUpdate(_id, { confirmed: true });
    const token = user.generateAuthToken();

    res.header('X-Auth-Token', token).send({
        message: 'Your account has been verified',
        token
    });
});

module.exports = router;
