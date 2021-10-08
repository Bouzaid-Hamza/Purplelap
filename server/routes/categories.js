const express = require('express');
const { Category, validateCategory } = require('../models/category');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
});

router.post('/', auth, admin, validate(validateCategory), async (req, res) => {
    const doesExist = await Category.findOne({ name: req.body.name });
    if (doesExist) return res.status(400).send({ message: 'Duplicate names is not allowed.' });

    const category = new Category(req.body);
    await category.save();

    res.send(category);
});

module.exports = router;
