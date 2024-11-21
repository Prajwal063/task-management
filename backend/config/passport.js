const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
  const { id, emails, name } = profile;

  try {
    let user = await User.findOne({ email: emails[0].value });

    if (!user) {
      user = new User({
        firstName: name.givenName,
        lastName: name.familyName,
        email: emails[0].value,
        password: 'google-oauth-password', // Placeholder password for Google sign-in
      });
      await user.save();
    }

    return done(null, user);
  } catch (err) {
    console.error(err);
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
