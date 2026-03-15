const express=require('express');
const { testUserController } = require('../controllers/testController');


//router obj
const router=express.Router()

//routes get,post,update,delete
router.get('/test-user',testUserController)

//export
module.exports=router