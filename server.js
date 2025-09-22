require ('dotenv').config(); // initialize immediately at start.  This invokes dotenv, allowing process.env to be called subsequently in any file.  This runs at start so every file may use dotenv.  (Though perhaps it should be explicitly added as a backup require in other files just in case).
const connectMongooseToMongoDB = require('./config/database');
const express = require('express');
const passport = require('passport');
const routes = require('./routes/index.js');
const cors = require('cors');

/**
 * 
 * https://www.geeksforgeeks.org/node-js/npm-cors/
 * 
 * 
 * const corsOptions = {
  origin: 'http://localhost:5173', (or whatever)
};

app.use(cors(corsOptions));
 */

// remember http://localhost:3000/api/auth/github/callback is api/user here.

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

// similarly to require dotenv, use app.use(express.json) immediately.
app.use(express.json()); // 'Parsing' of JSON in body and sometimes header into Javascript objects, attached to req.body.  Though this is done after passport is done in example.

const session = require('express-session');
app.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUnitialized: false
  })
);
app.use(passport.session());
app.use(passport.initialize()); // initializing passport as middleware

// Change the structure to be similar to Lab 2.
//app.use('/api/users', userRoutes);
app.use(routes);

const startServer = async () => {
  await connectMongooseToMongoDB();
}

startServer();

// creates a listener that listens on the specified port, using Node's http module to create a HTTP server.
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
