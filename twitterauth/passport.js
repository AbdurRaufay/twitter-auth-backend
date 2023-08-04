// // twitterauth/passport.js
// const passport = require('passport');
// const TwitterStrategy = require('passport-twitter').Strategy;
// const User = require('./User');

// passport.use(
//   new TwitterStrategy(
//     {
//       consumerKey: '0V3aAF0k6f3cGMdltbGvsLgxC',
//       consumerSecret: 'jX3a7wHQShEMNWMbwrwqlVilguecgciOmtjgpa6qzvVimsrONO',
//       callbackURL: 'http://localhost:8080/auth/twitter/callback',
//     },
//     async (token, tokenSecret, profile, done) => {
//       try {
//         const existingUser = await User.findOne({ twitterId: profile.id });
//         console.log(existingUser, "ex");
//         if (existingUser) {
//           return done(null, existingUser);
//         } else {
//           // Create a new user if not found in the database
//           const newUser = new User({
//             twitterId: profile.id,
//             username: profile.username,
//             name: profile.displayName,
//           });

//           const savedUser = await newUser.save();
//           return done(null, savedUser);
//         }
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );


// passport.serializeUser((user, done) => {
//   done(null, user.id); // Use user ID for serialization
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// });
// module.exports = passport;
// twitterauth/passport.js
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('./User');
// qMFOrYDplw6kXPN2KPOJ2AYAI
//       qXxFAYGKIE8avh72kH5A8jO4L7yy5qAmrRsviDIcqm8GfSGUay
passport.use(
  new TwitterStrategy(
    {
      consumerKey: '0V3aAF0k6f3cGMdltbGvsLgxC',
      consumerSecret: 'jX3a7wHQShEMNWMbwrwqlVilguecgciOmtjgpa6qzvVimsrONO',
      callbackURL: 'https://calm-gold-codfish-wrap.cyclic.cloud/auth/twitter/callback',
      includeEmail: true,
    },
    async (token, tokenSecret, profile, done) => {
      console.log(profile.email,"info");
      try {
        const existingUser = await User.findOne({ twitterId: profile.id });
        
        if (existingUser) {
          return done(null, existingUser);
        } else {
          // Create a new user if not found in the database
          const newUser = new User({
            twitterId: profile.id,
            username: profile.username,
            name: profile.displayName,
            email: profile.emails ? profile.emails[0].value : null,
          });

          const savedUser = await newUser.save();
          return done(null, savedUser);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Use user ID for serialization
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
