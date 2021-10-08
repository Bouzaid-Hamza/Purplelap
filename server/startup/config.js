if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    const result = dotenv.config();
    if (result.error) throw result.error;
}

module.exports = () => {
    if (!process.env.JWT_PRIVATE_KEY) {
        throw new Error('FATAL ERROR: JWT_PRIVATE_KEY is not defined.');
    }
    if (!process.env.DB_HOST) {
        throw new Error('FATAL ERROR: DB_HOST is not defined.');
    }
}
