const express = require('express');
const { BestReview, validateBestReview } = require('../models/bestReview');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin')
const { User } = require('../models/user');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    const bestReviews = await BestReview.find().populate({ path: 'userId', select: ['name', 'img'] });
    res.send(bestReviews);
});

router.post('/', auth, admin, validate(validateBestReview), async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send({ message: 'Invalid user ID.' });

    const bestReview = new BestReview(req.body);
    await bestReview.save();

    res.send(bestReview);
});

module.exports = router;
