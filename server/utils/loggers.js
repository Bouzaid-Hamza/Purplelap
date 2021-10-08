const { createLogger, transports, format } = require('winston');
require('winston-mongodb');

const logger = createLogger({
    level: 'info',
    format: format.combine(format.prettyPrint(), format.simple()),
    transports: [new transports.Console()]
});

const loggerDb = createLogger({
    transports: [new transports.MongoDB({
        level: 'info',
        db: process.env.DB_HOST,
        collection: 'logs',
        options: { useUnifiedTopology: true }
    })]
});

module.exports = { logger, loggerDb };
