var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var loginRouter = require('./routes/login');
var newAccountRouter = require('./routes/newAccount');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var accountDashboardRouter = require('./routes/accountDashboard');
var createInstitutionRouter = require('./routes/createInstitution')
var institutionDashboardRouter = require('./routes/institutionDashboard');
var contactRouter = require('./routes/contact');
var termsRouter = require('./routes/terms');
var logoutRouter = require('./routes/logout');

/*new*/
var createInvoiceRouter = require('./routes/createInvoice');
var createReceiptRouter = require('./routes/createReceipt');
var sendDocumentsRouter = require('./routes/sendDocuments');
var previewRouter = require('./routes/preview');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'bunica',
    resave: false,
    saveUninitialized: false
}));

//roots
app.use('/', loginRouter);
app.use('/login', loginRouter);
app.use('/newAccount', newAccountRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/accountDashboard', accountDashboardRouter);
app.use('/institutionDashboard', institutionDashboardRouter);
app.use('/createInstitution', createInstitutionRouter);
app.use('/contact', contactRouter);
app.use('/terms', termsRouter);
app.use('/logout', logoutRouter);
/*new*/
app.use('/createInvoice', createInvoiceRouter);
app.use('/createReceipt', createReceiptRouter);
app.use('/sendDocuments', sendDocumentsRouter);
app.use('/preview', previewRouter);
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