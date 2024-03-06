const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

app.use(express.urlencoded());

app.use(cookieParser());

const db = require('./config/mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const sassMiddelware= require('node-sass-middleware');

// saasmiddelware must be used before server is starting 


// link:https://github.com/sass/node-sass-middleware
app.use(sassMiddelware({
    src:'./assests/SCSS',
    dest:'./assests/CSS',
    // debug true ka matlab ki hum error show karna chahte ,false tab rakhenge jab production pe hoga
    debug:true,
    // outputStyle ka matlab code single line mai ya multiplelines mai ,expanded for multiple lines
    outputStyle:'expanded',
    prefix:'/CSS'
}))

const port = 4200;
const path = require('path');

const expressLayouts = require('express-ejs-layouts');


// using expressLayouts before the routes
app.use(express.static('./assests'));
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up session middleware

// mongo store is used to store session in db

const mongoStoreInstance =  MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/contact_list_db',
    autoRemove: 'disabled'
    // Additional options if needed
  });

  
  
app.use(session({
    name: 'codeial',
    // todo later
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 360000 //in miliseconds  

    },
    store:mongoStoreInstance

}));

/* passport.initialize(): This middleware initializes Passport. It sets up Passport with the necessary settings and prepares it
 for authentication. It should be called before any passport authentication strategies are used. After this middleware is called,
  passport object is attached to the req (request) object, enabling subsequent Passport methods to interact with the current request.
  
  ->passport.session(): This middleware is a helper provided by Passport to support persistent login sessions. It enables Passport to use
   session-based authentication, meaning that once a user is authenticated, their credentials (or a reference to them) are stored in the session. 
   On subsequent requests, Passport will deserialize the user object out of the session and attach it to the req.user property.*/

app.use(passport.initialize());
app.use(passport.session());




/* Mount Router Middleware: Uses app.use() to mount the router middleware defined in the ./routes/index.js file. 
This means that any requests received by the server will be passed through the routes defined in the index.js router module. */


app.use('/', require('./routes/index'))
app.listen(port, (err) => {
    if (err) {
        console.log(`error:${err}`);
    }

    console.log(`server is running on port No:${port}`);

});