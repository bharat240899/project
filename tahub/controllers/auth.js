const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendOtpByEmail = (email, fname, otp) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Hi ${fname},\n\nYour OTP code is: ${otp}\n\nThank you!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending OTP email: ", error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({ user });
    });
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (!user) {
        return res.status(400).json({ error: "User with that email does not exist. Please signup." });
    }

    if (!user.authenticate(password)) {
        return res.status(401).json({ error: "Email and password do not match." });
    }

    const otp = crypto.randomInt(100000, 999999);
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP email with the user's first name
    sendOtpByEmail(user.email, user.fname, otp);

    return res.json({
        message: "OTP sent to your email. Please verify to continue.",
        user: { email: user.email, role: user.role }
    });
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email }).exec();

    if (!user || !user.verifyOtp(otp)) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { email: user.email, fname: user.fname, lname: user.lname }, role: user.role, _id: user._id });
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Signed out" });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
    const user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({ error: "Access denied" });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({ error: "Admin resource! Access denied" });
    }
    next();
};

exports.isInstructor = (req, res, next) => {
    if (req.profile.role !== 2) {
        return res.status(403).json({ error: "Instructor resource! Access denied" });
    }
    next();
};

exports.isComem = (req, res, next) => {
    if (req.profile.role !== 3) {
        return res.status(403).json({ error: "Committee resource! Access denied" });
    }
    next();
};
