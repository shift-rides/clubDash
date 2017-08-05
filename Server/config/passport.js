const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/User');

const passportHelper = (app) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
    ((accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) {
          done(err, null);
        } else if (user) {
          done(null, user);
        } else {
          const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            imageUrl: profile.photos[0].value,
            email: profile.emails[0].value,
            waivers: [],
          });
          newUser.save((saveErr) => {
            if (saveErr) {
              done(saveErr, null);
            } else {
              done(null, newUser);
            }
          });
        }
      });
    }),
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = passportHelper;
