const express = require('express');
const path = require('path');
const router = express.Router();
const {registerUser, loginUser } = require('../controllers/authCtrl');
const verifyToken = require('../middleware/tokenVerfication');

router.post("/register",registerUser);
router.post("/login",loginUser);
// router.get("/login",(req,res)=>{
//     res.send()
// })
// router.post("/getuser",verifyToken,getuser);


module.exports= router