'use strict';

const mongoose = require('mongoose');
const app = require('./server/config/express');
const config = require('./server/config/config');

if (config.server.ENV === 'DEV') { }

mongoose.connect(config.db.URL, (err) => {
    if (err) throw err;
});

app.listen(config.server.PORT, (err) => {
    if (err) throw err;

    console.info(`Application running at port: ${config.server.PORT}`);
});