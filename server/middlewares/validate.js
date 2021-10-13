module.exports = (validator) => (req, res, next) => {
    const { error } = validator(req.body);

    if (error) {
        if (error.details.length === 1) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const messages = [];
        error.details.forEach(item => {
            messages.push({
                message: item.message,
                path: item.path
            });
        });

        return res.status(400).send(messages);
    }

    next();
}
