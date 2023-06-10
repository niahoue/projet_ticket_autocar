require('dotenv').config(); 
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true,
    useUnifiedTopology: true 
     })
  .then(() => console.log('Connexion à MongoDB établie'))
  .catch(() => console.error('Erreur de connexion à MongoDB'));


  const app = express();

  app.set('layout','./layouts/main')
  app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static('public'));
app.use(expressLayouts);



//passport config
require('./config/passport')(passport);

//express session middleware
app.use(session({
    secret:process.env.SECRET,
    resave:true,
    saveUninitialized:true
    }));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//flash middleware
app.use(flash());

//global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.session.user;
    res.locals.company = req.session.company

    next();
    });

//importations de routes
const routes = require('./routes/index');
const userRoute = require('./routes/userRoute');
const companyRoute = require('./routes/companyRoute');
const contactRoute = require('./routes/contactRoute')
const locationRoute = require('./routes/locationRoute');
const admin = require('./routes/adminRoute')

//middlewares des routes
app.use('/',routes);
app.use('/users',userRoute);
app.use('/company',companyRoute);
app.use('/contact',contactRoute);
app.use('/location',locationRoute);
app.use('/admin',admin);












module.exports = app 