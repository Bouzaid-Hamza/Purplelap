// Joi custom method
module.exports = (value, helpers) => {
    if (!value.match(/^https:\/\/.+((\.)+(jpeg|jpg|png))(\?(.*))?$/)) {
        return helpers.error('any.invalid');
    }

    return value;
};
