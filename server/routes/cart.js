const express = require('express');
const auth = require('../middlewares/auth');
const { User, validateMiniLaptop } = require('../models/user');
const validate = require('../middlewares/validate');
const categoryMap = require('../utils/categoryMap');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id);

    const laptops = [];
    for (const item of user.cart) {
        const Model = categoryMap[item.category];
        const { _id, img, name, processor, price } = await Model.findById(item.laptopId);
        const laptop = { _id, img, name, processor, price, count: item.count };
        laptops.push(laptop);
    }

    res.send(laptops);
});

router.post('/', auth, validate(validateMiniLaptop), async (req, res) => {
    const { _id } = req.user;
    const { laptopId, category } = req.body;
    const user = await User.findById(_id);

    const Model = categoryMap[req.body.category];
    const doesExist = await Model.findById(req.body.laptopId);
    if (!doesExist) return res.status(400).send({ message: 'Invalid laptop or category.' });

    const laptop = { laptopId, category };

    const doesExistInCart = user.cart.find(item => {
        return item.laptopId.toString() === laptopId.toString() && item.category === category;
    });

    // user.addToCart();
    if (doesExistInCart) doesExistInCart.count++;
    else user.addToCart(laptop);

    await user.save();

    res.send({ message: 'Laptop has been added to to your cart successfully' });
});

module.exports = router;
