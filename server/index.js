require('./startup/config')();

const express = require('express');
const { logger } = require('./utils/loggers');

const app = express();
const port = process.env.PORT || 8080;

require('./startup/reports')();
require('./startup/database')();
require('./startup/validation')();
require('./startup/routes')(app);

// if (process.env.NODE_ENV === 'production') {
//     require('./startup/production')(app);
// }
require('./startup/production')(app);

const server = app.listen(port, () => {
    logger.info(`listening on port ${port}...`);
});

module.exports = server;
