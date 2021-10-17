const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const filePath = path.join(__dirname, '../../client/build');

module.exports = (app) => {
    app.use(helmet());
    app.use(compression());

    app.use(express.static(filePath));

    app.get('/hoome', (req, res) => {
        // res.sendFile(filePath);
        res.send({ home: 'home' });
    });
}
