const passport = require('passport');

module.exports = (req, res, next) => {
    const passAuth = passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) return res.status(400).send(info);
        req.login(user, err => {
            if (err) throw err;
            res.send(info);
        });
    });
    passAuth(req, res, next);
}
