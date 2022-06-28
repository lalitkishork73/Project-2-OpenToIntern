const express=require('express');
const router=express.Router();
const intern=require('../controller/internController');

router.get('/test',intern.intern)

module.exports=router;