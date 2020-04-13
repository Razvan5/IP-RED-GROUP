var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//------------------------------------------ROUTS
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');
var accountDashboardRouter = require('./routes/accountDashBoard');
var institutionDashboardRouter = require('./routes/institutionDashBoard');
var termsRouter = require('./routes/terms');
var contactRouter = require('./routes/contact');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // use all static files like .css and .js from public.

//------------------------------------------USE
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/accountDashBoard', accountDashboardRouter);
app.use('/institutionDashBoard', institutionDashboardRouter);
app.use('/terms',termsRouter);
app.use('/contact',contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
