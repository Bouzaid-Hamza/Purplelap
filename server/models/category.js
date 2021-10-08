const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 40
    },
    img: {
        type: String,
        required: true,
        unique: true,
        minlength: 10
    }
});

const Category = mongoose.model('Category', categorySchema);

const validateCategory = (category) => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(40).required(),
        img: Joi.string().min(10).required()
    });

    return schema.validate(category, { abortEarly: false });
}

module.exports = { categorySchema, Category, validateCategory };
