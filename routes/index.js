const express =require('express');

const home_controller =require('../Controller/home_controller');
const router=express.Router();

router.get('/',home_controller.home);

console.log('router loaded');

module.exports=router;