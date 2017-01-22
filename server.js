'use strict';

const mongoose = require('mongoose');
const app = require('./server/config/express');
const config = require('./server/config/config');

if (config.server.ENV === 'DEV') {
    //TODO: USE MORGAN FOR LOGGING
}

mongoose.Promise = global.Promise;
mongoose.connect(config.db.URL, (err) => {
    if (err) {
        throw new Error(err);
    }
});

app.listen(config.server.PORT, (err) => {
    if (err) {
        throw new Error(err);
    }

    console.info(`Application running at port: ${config.server.PORT}`);
});