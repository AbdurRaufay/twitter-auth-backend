  // // server.js
  // const express = require('express');
  // const cors = require('cors');
  // const session = require('express-session');
  // const passport = require('passport');
  // const app = express();
  // const port = process.env.PORT || 8080;
  // const MongoStore = require('connect-mongo')
  // const mongoURI = 'mongodb+srv://abdurrauf0306:abdurrauf@cluster0.by77abb.mongodb.net/twitter-auth'; // Replace with your MongoDB connection URI

  // // Connect to MongoDB
  // const mongoose = require('mongoose');
  // mongoose.connect(mongoURI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  // app.options('*', cors());

  // app.use(cors());

  // app.use(express.json());

  // app.use(
  //   session({
  //     secret: 'keyboard cat',
  //     key: 'sid',
  //     resave: true,
  //     saveUninitialized: false,
  //     store: new MongoStore({
  //       mongoUrl: mongoURI,
  //     }),
  //   })
  // );

  // app.use(passport.initialize());
  // app.use(passport.session());
 

  // app.get('/auth/twitter', passport.authenticate('twitter'));
  // // Twitter callback
  // app.get(
  //   '/auth/twitter/callback',
  //   passport.authenticate('twitter', { failureRedirect: '/login-failed' }),
  //   (req, res) => {
  //     res.redirect('https://marvelous-churros-c678e1.netlify.app');
  //   }
  // );

  // // Start the server
  // app.listen(port, () => {
  //   console.log(`Server running on http://localhost:${port}`);
  // });


  // server.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const twitterAuthMiddleware = require('./twitterauth/passport'); // Import the passport middleware
const app = express();
const port = process.env.PORT || 8080;
const MongoStore = require('connect-mongo')
const mongoURI = 'mongodb+srv://abdurrauf0306:abdurrauf@cluster0.by77abb.mongodb.net/twitter-auth'; // Replace with your MongoDB connection URI

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.options('*', cors());

app.use(cors());

app.use(express.json());

app.use(
  session({
    secret: 'keyboard cat',
    key: 'sid',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: mongoURI,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/twitter', passport.authenticate('twitter'));
// Twitter callback
app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login-failed' }),
  (req, res) => {
    res.redirect('https://marvelous-churros-c678e1.netlify.app');
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
