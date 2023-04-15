const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require('./routes/model/user')
const GOOGLE_CLIENT_ID ="paste here from Google";
const GOOGLE_CLIENT_SECRET = "paste here from Google";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async(accessToken, refreshToken, profile, done)=> {
      // done(null, profile);
      // console.log(profile);
      try {
        const user = await User.findOne({ provider: 'google', googleId: profile.id});
        if (!user) {
          const newUser = new User({
            provider: 'google',
            googleId: profile.id,
            name: profile.displayName,
            // email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : '',
            // photo: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '',

            accessToken: accessToken,
          });
          await newUser.save();
          // console.log(accessToken)
          // console.log("New user ", newUser);
          return done(null, newUser);
        } else {
          const existingUser = await User.findOne({googleId:profile.id});
          // console.log("Existing user",existingUser)
          if (!existingUser) {
            return done(null, false);
          }
          return done(null, existingUser);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
