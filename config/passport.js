'use strict'

module.exports = function(passport) {

  var InstagramStrategy = require('passport-instagram').Strategy;

  var INSTAGRAM_CLIENT_ID = "6d90c568e3474ae1b00e14703ff6df9c"
  var INSTAGRAM_CLIENT_SECRET = "3bdd25fff7e345a6bd5f7e3ef2d31ed7";


  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.  However, since this example does not
  //   have a database of user records, the complete Instagram profile is
  //   serialized and deserialized.
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });


  // Use the InstagramStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and Instagram
  //   profile), and invoke a callback with a user object.
  passport.use(new InstagramStrategy({
      clientID: INSTAGRAM_CLIENT_ID,
      clientSecret: INSTAGRAM_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/instagram/callback",
      scope: ['public_content','comments', 'relationships']
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {

      // To keep the example simple, the user's Instagram profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Instagram account with a user record in your database,
      // and return that user instead.
      return done(null, accessToken);
      });
    }
  ));
};
