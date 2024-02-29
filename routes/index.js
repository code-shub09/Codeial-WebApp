const express =require('express');

// This part imports the Express framework and a controller module named home_controller which presumably
//  contains logic for handling routes related to the home page.

const home_controller =require('../Controller/home_controller');

// This creates an instance of an Express router, which is used to define and handle routes.
const router=express.Router();



// This defines a route for the root path '/' and specifies that requests to this path should be handled
//  by the home function in the home_controller.

router.get('/',home_controller.home);



// This mounts another router middleware at the path /user. Requests to paths starting with /user will be forwarded 
// to the router defined in the user.js file located in the same directory.
router.use('/user',require('./user'));


// for any further route,acess from here:
// router.use('/routeName',router('./routerfile'));

router.use('/post',require('./post'));

console.log('router loaded');

module.exports=router;