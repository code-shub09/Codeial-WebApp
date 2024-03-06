const express =require('express');
const router=express.Router();
const passport=require('passport')




const userController=require('../Controller/user_controller');

router.get('/profile',passport.checkAuthentication,userController.profile);

router.get('/sign-up',require('../Controller/user_controller').SignUp);
router.get('/sign-in',passport.isSignIn,require('../Controller/user_controller').SignIn);

// for sign-up
router.post('/create',require('../Controller/user_controller').Create)


// this route is protected by passport.authenticate
router.post('/create-session',passport.authenticate(
    'local',{failureRedirect:'/user/sign-in'}  //If the user's credentials are valid, Passport.js proceeds with the authentication process and allows the request to proceed to the route handler function.
),require('../Controller/user_controller').session)

router.get('/sign-out',userController.signOut);

// router.post('/create',userController.posT);




module.exports=router;





