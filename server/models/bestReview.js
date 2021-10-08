const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2000
    }
});

const BestReview = mongoose.model('BestReview', schema);

const validateBestReview = (review) => {
    const schema = Joi.object({
        userId: Joi.objectId().required(),
        content: Joi.string().min(1).max(2000).required()
    });

    return schema.validate(review, { abortEarly: false });
}

module.exports = { BestReview, validateBestReview };
