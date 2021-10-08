module.exports = (validator) => {
    return (req, res, next) => {
        const { error } = validator(req.body);

        if (error) {
            // const messages = [];
            if (error.details.length === 1) {
                return res.status(400).send({ message: error.details[0].message });
            }

            const messages = {};
            error.details.forEach((item, index) => {
                // messages[index] = item.message;
                messages['message-' + (index + 1)] = item.message;
            });
            // return res.status(400).send({ message: messages.join('\n') });
            return res.status(400).send(messages);
        }

        next();
    }
}
