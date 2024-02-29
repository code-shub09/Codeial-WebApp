const express = require('express');

const router=express.Router();

const handlerFun=require('../Controller/post_controller').post;

router.get('/reels',handlerFun);



module.exports=router;