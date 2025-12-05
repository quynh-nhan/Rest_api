
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')

const file  = fs.readFileSync('./api-docs.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

//mongoose
const mongoose= require("mongoose");
require("./model/Category");
require("./model/Product");
require("./model/image");
require("./model/Order");
require("./model/user");
require("./model/Review");
require("./model/OrderDetail");
require("./model/cart");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/categoryRoter');
var productRouter = require('./routes/productRoter');
var imageRouter = require('./routes/imageRoter');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//connect database
mongoose.connect('mongodb+srv://truongnguyenquynhnhan_db_user:K36Nb5uyQW0tZtq2@cluster0.dadqfpi.mongodb.net/MD20302')
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category',categoryRouter);
app.use('/product',productRouter);
app.use('/image',imageRouter);
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
