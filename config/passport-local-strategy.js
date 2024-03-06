/* Passport.js is a popular authentication middleware for Node.js applications. It provides a flexible and modular way 
to implement various authentication strategies, including local authentication (username/password), OAuth, OpenID, and more.
Passport.js follows the concept of strategies, where each authentication method is encapsulated in its own "strategy".
 Passport-local is one such strategy that provides local authentication using a username and password.*/

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../Models/user');

// authentication using passport js

// we are telling passport to use LocalStrategy
passport.use(new LocalStrategy({
  usernameField: 'email'
},

  // done here is callback function which is reporting back to the passport js
  // order matter in this case as data sent by the sign-in form are in same order as it is in function
  function (Email, p_assword,done) {
    //   find the user and establish the identity
    console.log('1'),
    User.findOne({ email: Email })
      .then((u_ser) => {
        if (!u_ser || u_ser.password != p_assword) {
          console.log('invalid username and password');
          return done(null, false)
        }
        console.log('2');
        return done(null, u_ser);
      })
      .catch((err) => {
        console.log(err + 'THERE IS ERROR11111');
        done(err);

      })

  }
))

// serialising the user to decide which key is to kept in the cookies


/* Serialization: The process of converting user data into a format that can be stored in the session (e.g., user ID). 
It occurs when a user logs in or signs up, and their user data needs to be stored in the session.*/

// jab bhi user login ya sign up karta h to ek seesion create hota h  jo ensycripted hota h jiske ke liye hum user ki unique id lete h ,us process ko hum serilsation bolte h ,jab bhi user login ya sign -ip karega to ye function call hoga
passport.serializeUser(function (user, done) {
  console.log('3');
  done(null, user._id)
})

// deserialising the user

/*Deserialization: The process of retrieving user data from the session and reconstructing the user object. 
It occurs when a user makes a subsequent request, and their stored session data needs to be converted back into user data. */

// ab jab user sign in  ke baad again koi request karega to pehele uska session_id seusko  user mai badlenge fir usko respnse bhejenge
// jab bhi user subsequent request karga to pehle ye function call hoga to authenticate and to find user 
passport.deserializeUser((id, done) => {

  User.findById(id).
    then((u_ser) => {
      return done(null, u_ser);

    }).catch((err) => {
      console.log(err);
      return done(err);

    })


})

// this function will we used as middelware
passport.checkAuthentication=function(req,res,next){
  // agar user ne sign in kar rakha h tabhi user profile page visit kar paayega ,hum ye check kr rahe h
  // console.log('user is authenticated');
  if(!req.isAuthenticated()){
    //console.log('user is authenticated');
    console.log('user is unauthenticated');
    
    return res.redirect('/user/sign-in');
    
  }
  //  agar user sign in nahi h
  console.log(req.user);
  return next();

}



passport.setAuthenticatedUser=function(req,res,next){
  if(req.isAuthenticated()){
    // In Express.js, the locals property of the response object (res.locals) is an object used to pass data from middleware to the view templates.
   
   
  //  user: An object containing the authenticated user (if authentication middleware is used).
  // req.user ke andar current sign in user data hota h
    res.locals.user=req.user;
    res.locals.post=req.post;
  }
  next();
}


passport.isSignIn=(req,res,next)=>{
  if(req.isAuthenticated()){
    return res.redirect('/user/profile');
  }
  return next();
}
module.exports = passport;





