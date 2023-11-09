const express = require('express');
const app = express();
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const campgroundsRoutes = require('./routers/campgrounds');
const reviewsRoutes = require('./routers/reviews');
const usersRoutes = require('./routers/users');
const User = require('./views/modules/users');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to database');
});

const sessionConfig = {
  secret: 'thisisasecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() * 604800000,
    maxAge: 604800000
  }
};

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session(sessionConfig));
app.use(flash());

app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  console.log(req.session.returnTo)
  res.locals.currentUser = req.user;
  res.locals.succes =req.flash('succes');
  res.locals.error =req.flash('eroor');
  next();
})

app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/reviews', reviewsRoutes);
app.use('', usersRoutes);

app.get('/', (req, res) => {
  res.send('home');
});


// ERROR MIDDLEWARE
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'OH No Something Went Wrong';
  res.render('error', { err });
});

app.listen(3000, () => console.log('app listening on port 8008'));
