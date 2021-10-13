const express = require('express');
const { User } = require('../../models/user');
const { validateMiniLaptop } = require('../../models/miniLaptop');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryMap = require('../../utils/categoryMap');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id);

    const laptops = [];
    for (const item of user.cart) {
        const Model = categoryMap[item.category];
        const laptop = await Model.findById(item.laptopId);
        laptops.push({ ...laptop._doc, count: item.count });
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

    const doesExistInCart = user.cart.find(item => {
        return item.laptopId.toString() === laptopId.toString() && item.category === category;
    });

    if (doesExistInCart) doesExistInCart.count++;
    else user.addToCart({ laptopId, category });

    await user.save();

    res.send({ message: 'Laptop has been added to to your cart successfully' });
});

router.put('/', auth, async (req, res) => {
    const { _id } = req.user;
    const { laptopId, count } = req.body;
    const user = await User.findById(_id);

    const laptopIndex = user.cart.findIndex(item => item.laptopId.toString() === laptopId);
    if (laptopIndex === -1) return res.status(400).send({ message: 'Invalid laptop.' });

    user.cart[laptopIndex].count = count;
    user.save();

    res.send({ message: 'Cart has been updated successfully' });
});

module.exports = router;
