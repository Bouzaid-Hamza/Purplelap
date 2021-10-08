const { loggerDb, logger } = require('../utils/loggers');

module.exports = (err, req, res, next) => {
    logger.info(err.message, err);
    loggerDb.info(err.message, err);
    return res.status(500).send({ message: 'Something went wrong. Please try again.' });
}
