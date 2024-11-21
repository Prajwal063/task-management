const express = require('express');
const passport = require('passport');
const { register, login, googleLoginSuccess, googleLoginFailure } = require('../controllers/authController');
const router = express.Router();

// Register and Login routes
router.post('/register', register);
router.post('/login', login);

// Google authentication routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after successful Google login
router.get('/auth/google/callback', passport.authenticate('google', { session: false }), googleLoginSuccess);

// Failure route if Google login fails
router.get('/auth/google/failure', googleLoginFailure);

module.exports = router;
