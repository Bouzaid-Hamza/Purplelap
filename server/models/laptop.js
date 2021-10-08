const mongoose = require('mongoose');
const Joi = require('joi');
const validateImg = require('../utils/validateImg');

const value = (min, max) => {
    return {
        type: String,
        required: true,
        minlength: min,
        maxlength: max
    }
}

const img = {
    type: String,
    required: true,
    minlength: 10
};

const price = {
    type: Number,
    required: true,
    min: 0
};

const laptopSchema = new mongoose.Schema({
    name: { ...value(4, 40), unique: true },
    resolution: value(8, 40),
    processor: value(4, 40),
    graphics: value(4, 40),
    ram: value(3, 40),
    storage: value(4, 40),
    os: value(4, 40),
    img: img,
    price: price
});

const validateLaptop = (laptop) => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(40).required(),
        resolution: Joi.string().min(8).max(40).required(),
        processor: Joi.string().min(4).max(40).required(),
        graphics: Joi.string().min(4).max(40).required(),
        ram: Joi.string().min(3).max(40).required(),
        storage: Joi.string().min(4).max(40).required(),
        os: Joi.string().min(4).max(40).required(),
        img: Joi.string().uri().custom(validateImg).required(),
        price: Joi.number().min(0).required()
    });

    return schema.validate(laptop, { abortEarly: false });
}

module.exports = { laptopSchema, validateLaptop };
