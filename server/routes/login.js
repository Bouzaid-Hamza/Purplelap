const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ message: 'Invalid email or password.' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ message: 'Invalid email or password.' });

    const confirmed = user.confirmed;
    if (!confirmed) return res.status(401).send({ message: 'This account is not confirmed.' });

    const token = user.generateAuthToken();

    res.send({ message: token });
});

module.exports = router;
