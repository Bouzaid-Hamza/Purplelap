const mongoose = require('mongoose');
const Joi = require('joi');

const BestSeller = mongoose.model('BestSeller', new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}));

const validateBestSeller = (bs) => {
    const schema = Joi.object({
        category: Joi.string().min(4).max(40).required(),
        _id: Joi.objectId().required()
    });

    return schema.validate(bs, { abortEarly: false });
}

module.exports = { BestSeller, validateBestSeller };
