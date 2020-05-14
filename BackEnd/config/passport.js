require('dotenv').config();

const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'email', 'gender', 'link', 'name', 'photos'],
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await User.findOne({ facebookId: profile.id });
      if (!user) {
        const userCreated = await User.create({
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          facebookId: profile.id,
          email: profile.emails[0].value,
          photoURL: profile.photos[0].value,
        });
        return cb(null, userCreated);
      } else {
        cb(null, user);
      }
    }
  )
);

//Google Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
        })
        return done(null, user)
      } else {
        return done(null, user)
      }
    }
  )
);

// Local Strategy
passport.use(User.createStrategy());

passport.serializeUser(( user, done ) => { done ( null, user.id )});

passport.deserializeUser(( id, done ) => {
  User.findById( id, ( err, user ) => { done( err, user )});
});

module.exports = passport;
