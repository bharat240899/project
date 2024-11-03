const express = require('express');
const router = express.Router();

const { signup, signin, signout, requireSignin, verifyOtp } = require('../controllers/auth');
const { userSignupValidator } = require("../validator");

// Sign up route
router.post('/signup', userSignupValidator, signup);

// Sign in route (generates OTP and sends it to user's email)
router.post("/signin", signin);

// Verify OTP route (to complete login)
router.post("/verify-otp", verifyOtp);

// Sign out route
router.get("/signout", signout);

module.exports = router;
