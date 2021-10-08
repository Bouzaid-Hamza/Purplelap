require('express-async-errors');
const { logger, loggerDb } = require('../utils/loggers')

const logAndExit = (err) => {
    logger.info(err.message, err);
    loggerDb.info(err.stack);
    loggerDb.on('finish', () => { process.exit(1); });
}

module.exports = () => {
    process.on('uncaughtException', logAndExit);
    process.on('unhandledRejection', logAndExit);
}
