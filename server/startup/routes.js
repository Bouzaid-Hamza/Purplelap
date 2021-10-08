const express = require('express');
const error = require('../middlewares/error');
const cors = require('../middlewares/cors');

const login = require('../routes/login');
const users = require('../routes/users');
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

module.exports = (app) => {
    app.use(cors);
    app.use(express.json());
    app.use('/api/login', login);
    app.use('/api/users', users);
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
