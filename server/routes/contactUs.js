const express = require('express');
const auth = require('../middlewares/auth');
const receiveEmail = require('../utils/receiveEmail');

const router = express.Router();

router.post('/', auth, async (req, res) => {
    await receiveEmail({
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });

    res.send({ message: 'Email has sent successfully' });
});

module.exports = router;
