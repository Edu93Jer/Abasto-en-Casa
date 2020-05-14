require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport     = require('./config/passport');
const session      = require('express-session');
const flash        = require('connect-flash');
const cors         = require('cors')

mongoose
  .connect('mongodb://localhost/abasto-en-casa', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Session config
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash())
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3001"],
  })
);

const index = require('./routes/index');
app.use('/', index);
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);
const userRoutes = require('./routes/user');
app.use('/', userRoutes);
const productRoutes = require('./routes/product');
app.use('/', productRoutes);
const orderRoutes = require('./routes/order');
app.use('/', orderRoutes);

module.exports = app;
