const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

module.exports = (passport) => {
    const authenticate = async (email, password, done) => {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: 'Invalid email or password.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) return done(null, user, { message: 'Login successful' });
        return done(null, false, { message: 'Incorrect password.' });
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticate));

    passport.serializeUser((user, done) => done(null, user._id.toString()));

    passport.deserializeUser((id, done) => {
        console.log('deserializeUser function : ', id);
        User.findById(id, (err, user) => done(err, user));
    });
}
