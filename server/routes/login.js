const express = require('express');
const passportAuth = require('../middlewares/passportAuth');
const path = require('path');
const router = express.Router();

router.post('/', passportAuth);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/mail.html'));
});

router.get('/user', (req, res) => {
    console.log('/login/user: ', req.user);
    if (req.user) {
        const { password, ...user } = req.user._doc;
        return res.send(user);
    }

    res.status(401).send({ message: 'You need to login first!!' });
});

router.get('/out', (req, res) => {
    req.logout();
    res.send({ message: 'logout successful' });
});

module.exports = router;
