const express = require('express');
const { LatestLaptop, validateLatestLaptop } = require('../models/latestLaptop');
const categoryMap = require('../utils/categoryMap');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const findLaptopsByIds = require('../utils/findLaptopsByIds');

const router = express.Router();

router.get('/', async (req, res) => {
    const latestIds = Array.from(await LatestLaptop.find());
    const latests = await findLaptopsByIds(latestIds);

    res.send(latests);
});

router.post('/', auth, admin, validate(validateLatestLaptop), async (req, res) => {
    const category = categoryMap[req.body.category];
    if (!category) return res.status(400).send({ message: 'Invalid category.' });

    const laptop = await categoryMap[req.body.category].findById(req.body._id);
    if (!laptop) return res.status(400).send({ message: 'Invalid ID.' });

    const latest = new LatestLaptop(req.body);
    await latest.save();

    res.send(latest);
});

module.exports = router;
