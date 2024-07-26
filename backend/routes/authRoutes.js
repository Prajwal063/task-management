const express = require('express');
const passport = require('passport');

const { register, login, googleLoginSuccess, googleLoginFailure } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', { session: true }, (err, user, info) => {
    if (err) return next(err);
    return user ? req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/board'); // Redirect to the board page on successful login

    }) : res.redirect('/auth/google/failure'); // Redirect to failure page if no user

  })(req, res, next);
});

router.get('/auth/google/failure', (req, res) => {
  res.status(403).json({ success: false, message: 'Login failed' });
});


passport.initialize();
module.exports = router;
