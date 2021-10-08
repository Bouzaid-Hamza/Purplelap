const mongoose = require('mongoose');
const Joi = require('joi');

const LatestLaptop = mongoose.model('LatestLaptop', new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}));

const validateLatestLaptop = (latest) => {
    const schema = Joi.object({
        category: Joi.string().min(4).max(40).required(),
        _id: Joi.objectId().required()
    });

    return schema.validate(latest, { abortEarly: false });
}

module.exports = { LatestLaptop, validateLatestLaptop };
