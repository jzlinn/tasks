const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
require('dotenv').config();

const app = express();
const indexRouter = require('./server/routes/indexRouter');


mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DB_URL, () => {
  console.log(`MongoDB connected at ${process.env.DB_URL}`);
});
mongoose.connection.on('error', (error) => {
  if (error) {
    console.log('Error in Database Connection: ' + error);
  }
});

app.set('views', path.join(__dirname, 'server/views'));

var handlebars = exphbs.create({
  layoutsDir: path.join(__dirname, 'server/views'),
  defaultLayout: 'layout',
  extname: 'hbs',
});

// app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;