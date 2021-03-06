const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('../middlewares/cors');
const error = require('../middlewares/error');
const login = require('../routes/login');
const signup = require('../routes/signup');
const categories = require('../routes/categories');
const ultraPortables = require('../routes/ultraPortables');
const gamings = require('../routes/gamings');
const businesses = require('../routes/businesses');
const tdModelings = require('../routes/tdModelings');
const bestSellers = require('../routes/bestSellers');
const latestLaptops = require('../routes/latestLaptops');
const bestReviews = require('../routes/bestReviews');
const cart = require('../routes/cart');
const contactUs = require('../routes/contactUs');
const initPassport = require('../utils/passportConfig');

module.exports = (app) => {
    app.use(cors);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(cookieSession({
        secret: process.env.SESSION_SECRET,
        name: 'session',
        maxAge: 4800 * 60 * 60 * 1000,
        keys: ['key1', 'key2']
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    initPassport(passport);
    app.use('/api/login', login);
    app.use('/api/signup', signup);
    app.use('/api/categories', categories);
    app.use('/api/ultraPortables', ultraPortables);
    app.use('/api/gamings', gamings);
    app.use('/api/businesses', businesses);
    app.use('/api/tdModelings', tdModelings);
    app.use('/api/bestSellers', bestSellers);
    app.use('/api/latestLaptops', latestLaptops);
    app.use('/api/bestReviews', bestReviews);
    app.use('/api/cart', cart);
    app.use('/api/contactUs', contactUs);
    app.use(error);
}
