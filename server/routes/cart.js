const express = require('express');
const { User } = require('../models/user');
const { validateMiniLaptop } = require('../models/miniLaptop');
const validate = require('../middlewares/validate');
const categoryMap = require('../utils/categoryMap');
const router = express.Router();

router.get('/', async (req, res) => {
    const laptops = [];

    if (req.user) {
        for (const item of req.user.cart) {
            const Model = categoryMap[item.category];
            const laptop = await Model.findById(item.laptopId);
            laptops.push({ ...laptop._doc, count: item.count });
        }
    }

    res.send(laptops);
});

router.post('/', validate(validateMiniLaptop), async (req, res) => {
    if (req.user) {
        const { laptopId, category } = req.body;
        const user = await User.findById(req.user._id);

        const Model = categoryMap[category];
        const doesExist = await Model.findById(laptopId);
        if (!doesExist) return res.status(400).send({ message: 'Invalid laptop or category.' });

        const doesExistInCart = user.cart.find(item => {
            return item.laptopId.toString() === laptopId.toString() && item.category === category;
        });

        if (doesExistInCart) doesExistInCart.count++;
        else user.addToCart({ laptopId, category });

        await user.save();

        return res.send({ message: 'Laptop has been added to to your cart successfully' });
    }

    res.status(401).send({ message: 'You need to login first!!' });
});

router.put('/', async (req, res) => {
    const { laptopId, count } = req.body;
    const user = await User.findById(req.user._id);

    const laptopIndex = user.cart.findIndex(item => item.laptopId.toString() === laptopId);
    if (laptopIndex === -1) return res.status(400).send({ message: 'Invalid laptop.' });

    user.cart[laptopIndex].count = count;
    user.save();

    res.send({
        message: 'Cart has been updated successfully',
        count
    });
});

router.delete('/:laptopId', async (req, res) => {
    const user = await User.findById(req.user._id);
    const itemIndex = user.cart.findIndex(item => item.laptopId.toString() === req.params.laptopId);
    user.cart.splice(itemIndex, 1);
    await user.save();

    res.send({ message: 'Laptop has been removed successfully from the cart.' });
});

module.exports = router;
