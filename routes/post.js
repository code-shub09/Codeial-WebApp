// const express = require('express');
// const passport=require('passport')

// const router=express.Router();

// const handlerFun=require('../Controller/post_controller').posT;
// router.post('/create',passport.isSignIn,handlerFun);

// // router.post('/create',handlerFun);

// module.exports=router;


const express =require('express');
const router=express.Router();
const passport=require('passport')

const handlerFun=require('../Controller/pos_t_controller');
router.post('/create',handlerFun.posT);
router.post('/create-comment',handlerFun.comment)
// router.post('/create',handlerFun);

module.exports=router;
