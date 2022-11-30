const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const appRouter = require('./src/routes/shopify.routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(appRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONO_DB_CONNECTION_STRING, { useNewUrlParser: true })
.then(() => {
    console.log('Connection to the correct database !!!');
    app.listen(4200, () => {
        console.log('Application client-shopify-api is running on: http://localhost:4200');
    });
})
.catch(err => console.log(err));