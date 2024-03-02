const express =require('express');

const router=express.Router();

const userController=require('../Controller/user_controller');

router.get('/profile',userController.profile)

router.get('/sign-up',require('../Controller/user_controller').SignUp);
router.get('/sign-in',require('../Controller/user_controller').SignIn);

router.post('/create',require('../Controller/user_controller').Create)


module.exports=router;


