const jwt = require('jsonwebtoken');

// note - probably I would use (err, req, res, next) in practice - but only in the final middleware function.  Throwing an error to middleware that captures.  e.g. app.get('/:id', authMiddleware, doubleAuthMiddleware, tripleAuthMiddleware, userController.getUser), then app.use(errorHandlerMiddleware) as the very last line of all the routes.  See https://expressjs.com/en/guide/writing-middleware.html


function verifyAuthentication(req, res, next) {
  try {
    let token = req.headers.authorization; // potentially other places to see token; see lesson 4 (?)
    // req.body?.token || req.query.token || req.headers.authorization.  But make req.headers first, because it's the usual practice, no need to waste extra checks.  req.body?.token optional chaining because there may be no body; if simply req.body.token will crash, so use req.body?.token.

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token or incorrect format.' })
    }

    token = token.split(' ').pop().trim();

    const jwtSecretKey = process.env.JWT_SECRET;
    const payload = jwt.verify(token, jwtSecretKey); // ...jwtSecretKey, { maxAge: '2h' }); for maximum token age.  Theoretically this need not happen, as tokens we generate with jwt expire anyways, but what if there's an alternate implementation that doesn't expire, or what if attackers find some vector to hit?  Hm.

    req.user = payload.data; // remember, when we generated the token, we set what we wanted in the payload in an object with key data; this object is itself in another object with iwt or whatever the time limit is, and other info.  At any rate, we set payload.data to contain an object, now we get that object.
    // as to what is the rest of this, remember this is middleware with next() and we're setting the req.user to equal the payload, so there will *be* a req.user.  So down the line when we want to pull the user ID to see what notes or whatever match that user, we don't even have a user ID if we don't have a user.  It'll crash saying 'Need to be logged in' or such.
    
    next();
  } catch(error) {
    console.error(error);
    res.status(401).json({ error: 'Token invalid. '});
  }
}

module.exports = verifyAuthentication;