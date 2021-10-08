const mongoose = require('mongoose');
const { logger } = require('../utils/loggers');

module.exports = () => {
    mongoose.connect(process.env.DB_HOST).then(() => {
        logger.info('connected to mongodb...');
    });
}
