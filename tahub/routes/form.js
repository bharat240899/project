const express=require('express')
const router=express.Router()


const { 
    create, list
}=require('../controllers/form');
const {requireSignin,isAuth} =require("../controllers/auth");
const {userById}=require("../controllers/user");
const {jobById}=require("../controllers/postings");



router.post("/apply/create/:jobId/:userId",
    requireSignin,
    isAuth,
    create

);
//get job list
router.get('/applications',list);

router.param("userId",userById);
router.param("jobId",jobById);
module.exports=router;