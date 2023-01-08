const express = require('express');
const nationRouter = require('../routes/nations');
const playerRouter = require('../routes/players');

module.exports = function (app) {
    app.use(express.json());
    app.use('/nations', nationRouter);
    app.use('/players', playerRouter)
}