const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require('./routes/model/user')
const GOOGLE_CLIENT_ID =
  "639925081134-s8ri70anlbegprvmk4ehm5oos6pv3lsl.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

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


// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const passport = require("passport");
// const User = require('./routes/model/user')
// const GOOGLE_CLIENT_ID =
//   "639925081134-s8ri70anlbegprvmk4ehm5oos6pv3lsl.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET = "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";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//     },
//     async(accessToken, refreshToken, profile, done)=> {
//       // done(null, profile);
//       console.log(profile);
//       try {
//         const user = await User.findOne({ provider: 'github', githubId: profile.id});
//         if (!user) {
//           const newUser = new User({
            
            
//             provider: 'github',
//             githubId: profile.id,
//             name:profile.username,
//             accessToken:accessToken,
            
//           });
//           await newUser.save();
//           // console.log(accessToken)
//           return done(null, newUser);
//         } else {
//           const existingUser = await User.findOne({githubId:profile.id});
//           if (!user) {
//             return done(null, false);
//           }
//           return done(null, existingUser);
//         }
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
