const mongoose = require('mongoose');
const Joi = require('joi');

const miniLaptopSchema = new mongoose.Schema({
    laptopId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    category: {
        type: String,
        required: true,
        ref: 'Category'
    },
    count: {
        type: Number,
        required: false,
        default: 1,
        min: 1
    }
});

const validateMiniLaptop = (miniLaptop) => {
    const schema = Joi.object({
        laptopId: Joi.objectId().required(),
        category: Joi.string().min(4).max(40).required()
    });

    return schema.validate(miniLaptop, { abortEarly: false });
}

module.exports = { miniLaptopSchema, validateMiniLaptop }
