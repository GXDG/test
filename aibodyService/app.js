var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var appRouter = require('./routes/app/index');
var adminRouter = require('./routes/admin/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));


let resCode = {
    authCode: { code: 0, msg: "用户未登录" }
}
let tokenUtil = require('./common/tokenUtils');
app.all('/app*', function(req, res, next) {
    console.log('>>>>>>>>>app 拦截<<<<<<<<<<<<<', req.originalUrl)
    console.log('Request Type:', req.method);
    if (req.path == '/app/login' || req.path == '/app/appLogin' || req.path == '/app/register' || req.path == '/app/getSMSCode') {
        next();
        return
    }
    if (!req.get('token')) {
        res.send(resCode.authCode);
        return
    }
    let userId = req.query ? req.query.userId : req.body.userId;
    tokenUtil.checkToken(req.get('token'), userId, function(success) {
        if (success) {
            next();
            return
        }
        res.send(resCode.authCode);
    })

});
//app.use('/', indexRouter);
app.use('/app', appRouter);
app.use('/admin', adminRouter);
app.get('/index', function(req, res) {
        let a = path.join(__dirname, 'dist/index.html')
        res.sendFile(a)
    })
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