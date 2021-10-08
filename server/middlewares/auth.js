const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('X-Auth-Token');
    if (!token) return res.status(401).send({ message: 'Access denied. No token provided.' });
    try {
        req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        next();
    } catch (e) {
        res.status(400).send({ message: 'Invalid token.' });
    }
}
