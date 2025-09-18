const jwt = require('jsonwebtoken');
 
const secret = process.env.JWT_SECRET;
const expiration = '2h';
 
module.exports = {
  authMiddleware: 
  
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers.authorization;
 
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
 
    if (!token) {
      return res.status(401).json({ message: 'You must be logged in to do that.' });
    }
 
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(401).json({ message: 'Invalid token.' });
    }
 
    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    // this is not a separate variable in the example.
    const callback = (error, token) => {
      if (error) throw error; // note that jwt.sign's invocation in userRoutes.js really ought to be in a try/catch, as it could fail.
      res.status(200).json({ success: 'User created successfully',  token});
    }

    // in the 'catch' block, 400 res.status.
    // signToken was used in registerUser as well as login, except 'User logged in' instead of 'created' successfully.
 
    // pass with below, ...expiration }, callback);
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
//