const mongoose = require('mongoose');
const { laptopSchema } = require('../models/laptop');

module.exports = (name, model) => {
    return mongoose.model(model || name, new mongoose.Schema({
        category: {
            type: String,
            default: name,
            required: false
        },
        ...laptopSchema.obj
    }));
}
