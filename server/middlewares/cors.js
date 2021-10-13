module.exports = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Auth-Token, Content-Type, Accept, Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}
