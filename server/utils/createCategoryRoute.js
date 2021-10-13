const express = require('express');
const { validateLaptop } = require('../models/laptop');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

module.exports = (Model) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        const list = await Model.find();
        res.send(list);
    });

    router.post('/', auth, admin, validate(validateLaptop), async (req, res) => {
        const doesExist = await Model.findOne({ name: req.body.name });
        if (doesExist) return res.status(400).send({ message: 'Duplicate names is not allowed.' });

        const laptop = new Model(req.body);
        await laptop.save();

        res.send(laptop);
    });

    return router;
}
