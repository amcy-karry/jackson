var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var session = require('express-session');

var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var onepageRouter = require('./routes/onepage');
var introRouter = require('./routes/intro');
var onepage1Router = require('./routes/onepage1');
var workRouter = require('./routes/work');
var forumRouter = require('./routes/forum');
var shopRouter = require('./routes/shop');
var contactRouter = require('./routes/contact');
var administrationRouter = require('./routes/administration');
const { Cookie } = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("111"));
app.use(session({
  secret:"111",
  cookie:{maxAge:60000},
  resave:false
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use("/onepage",onepageRouter);
app.use("/intro",introRouter);
app.use("/onepage1",onepage1Router);
app.use('/work',workRouter);
app.use('/forum',forumRouter);
app.use('/shop',shopRouter);
app.use('/contact',contactRouter);
app.use('/administration',administrationRouter);


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
