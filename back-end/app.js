var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var upcFetchRouter = require('./routes/upcFetch');
var itemPostRouter = require('./routes/itemPost');
var dbFetchRouter = require('./routes/dbFetch');
var dbDeleteRouter = require('./routes/dbDelete');

const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://f:f@my-fridge.bojzpqg.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/upc-fetch', upcFetchRouter);
app.use('/add-to-db', itemPostRouter);
app.use('/db-fetch', dbFetchRouter);
app.use('/db-delete', dbDeleteRouter);

module.exports = app;
