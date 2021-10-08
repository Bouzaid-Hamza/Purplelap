const express = require('express');
const { BestSeller, validateBestSeller } = require('../models/bestSeller');
const categoryMap = require('../utils/categoryMap');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const findLaptopsByIds = require('../utils/findLaptopsByIds');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    const bssIds = Array.from(await BestSeller.find());
    const bss = await findLaptopsByIds(bssIds);

    res.send(bss);
});

router.post('/', auth, admin, validate(validateBestSeller), async (req, res) => {
    const category = categoryMap[req.body.category];
    if (!category) return res.status(400).send({ message: 'Invalid category.' });

    const laptop = await categoryMap[req.body.category].findById(req.body._id);
    if (!laptop) return res.status(400).send({ message: 'Invalid ID.' });

    const bs = new BestSeller(req.body);
    await bs.save();

    res.send(bs);
});

module.exports = router;
