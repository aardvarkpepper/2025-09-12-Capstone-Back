const router = require('express').Router();

// admin/users GET, POST
// admin/users/:id PUT, DELETE (note:  replicant)
// admin/ools GET (replicant), POST (unique, unrestricted)
// admin/ools/:id PUT, DELETE
// admin/userlinks GET (all) (creation is a user thing)
// admin/userlinks/:id PUT, DELETE (in case administrators need to do something)


const adminUserRoutes = require('./adminUserRoutes');
const adminOolRoutes = require('./adminOolRoutes');
const adminUserLinkRoutes = require('./adminUserLinkRoutes');
 
router.use('/users', adminUserRoutes);
router.use('/ools', adminOolRoutes);
router.use('/userlinks', adminUserLinkRoutes);

module.exports = router;

/**
 * So I do this:
 * 
 * Say in routes/index.js (the main file that gets passed to server.js, say server has const routes = require('./routes/index.js'); then invoked with app.use(routes) has
 * 
 * const apiRoutes = require('./api/index')
 * router.use('/api', authenticateUser); // the middleware (must be listed first)
 * router.use('/api', apiRoutes); // the routes (must be listed last after all middlewares)
 * 
 * Then in *this* file, apiRoutes, routes/api/index.js, I have
 * 
 * router.use('/users', userRoutes) ...
 * I don't have to use authenticateUser again because 
 *  . . 
 * 
 * At any rate, we see that it MOSTLY works, but if I'm require router then maybe not.
 * 
 * Remember in class, we did like router.get('./api', authMiddleware, userRoutesWhatever).  That is, NOT with .use, but with .get, .put, whatever.  .use is middleware, .get is sorta . . . not?  ANyways.
 * 
 * 
 * if router.use('/users', userRoutes) is really for /api/users, and it passes *through* the router that has router.use('/api', authenticateUser); then I don't need to 
 * 
 * app.use('/api', authenticateUser); // applies middleware to all routes that start with /api so long as this router gets exported to them for use.  
 * 
 * 2 27 49
 * const router = require('express').Router({mergeParams: true});
 */