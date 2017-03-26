'use strict';

const express = require('express');
const parser = require('body-parser').json();
const logger = require('./Logger');
const errorHandler = require('./ErrorHandler');

const CommonServiceController = require('./common/CommonServiceController');

const app = express();

app.use(parser);
app.use(logger);

app.use('/storage/services', CommonServiceController.router());

app.use(errorHandler);

const server = app.listen(8888, function () {
    console.log("Listening at http://localhost:%s", server.address().port)
});