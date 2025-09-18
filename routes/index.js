const router = require('express').Router();
const adminRoutes = require('./admin/index');
const subRoutes = require('./sub/index');
const userRoutes = require('./user/index');

// admin/users GET, POST
// admin/users/:id PUT, DELETE (note:  replicant)

// admin/ools GET (replicant), POST (unique, unrestricted)
// admin/ools/:id PUT, DELETE
// admin/userlinks GET (all) (creation is a user thing)
// admin/userlinks/:id PUT, DELETE (in case administrators need to do something)

// subs/:id PUT DELETE (note: replicant)
// subs/ools GET (replicant), POST (unique, restricted)
// subs/userlinks GET (only for the sub), POST
// subs/userlinks/:id PUT, DELETE

// users/:id PUT DELETE
 
// const authController = require ('../controllers/authController');
const verifyAuthentication = require('../middleware/authMiddleware');
const subOnly = require('../middleware/subMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
const userController = require('../controllers/userController');
//router.use('/api', authenticationMiddleware, apiRoutes);
// const authController = require ('../controllers/authController');

// router.get('/', verifyAuthentication, authController.getUser);
// router.get('/admin', verifyAuthentication, adminOnly, authController.getUser);
// router.post('/register', authController.registerUser);
// router.post('/login', authController.loginUser);

router.use('/admin', verifyAuthentication, adminOnly, adminRoutes);
router.use('/subs', verifyAuthentication, subOnly, subRoutes);
router.use('/users', verifyAuthentication, userRoutes);
router.use('/register', userController.registerUser);
router.use('/login', userController.login)
 
router.use((req, res) => {
  res.status(404).send('<h1>404 Error</h1> <div>Please visit http://localhost:3001/api</div>'); // pop in a res.redirect too
});
// Triggers on anything not starting with /api, I suppose.
 
module.exports = router;