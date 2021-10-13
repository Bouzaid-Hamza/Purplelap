const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const passwordComplexity = require('joi-password-complexity');
const validateImg = require('../utils/validateImg');
const { miniLaptopSchema } = require('../models/miniLaptop');

const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 8,
        maxlength: 40
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    img: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/purplelap-ad0ac.appspot.com/o/Default-imgs%2Fdefault-user-icon.jpg?alt=media&token=97563e1c-83d9-4852-95d4-cd3c3c7b60c4',
        minlength: 10
    },
    confirmed: {
        type: Boolean,
        default: false,
        required: false
    },
    cart: {
        type: [miniLaptopSchema],
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: false
    }
});

userSchema.methods = {
    generateAuthToken: function () {
        const { _id, name, isAdmin } = this;
        return jwt.sign({ _id, name, isAdmin }, process.env.JWT_PRIVATE_KEY);
    },

    setConfirmed: function (bool) {
        this.confirmed = bool;
    },

    setAdmin: function (bool) {
        this.isAdmin = bool;
    },

    setImg: function (url) {
        this.img = url;
    },

    addToCart: function (laptop) {
        // this.cart = [];
        this.cart.push(laptop);
    }
}

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(40).required(),
        email: Joi.string().min(8).max(40).email().required(),
        password: passwordComplexity(complexityOptions).required(),
        img: Joi.string().uri().custom(validateImg)
    });

    return schema.validate(user, { abortEarly: false });
}

module.exports = { User, validateUser };
