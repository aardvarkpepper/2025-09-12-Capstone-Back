const router = require('express').Router();

// admin/users GET, POST
// admin/users/:id PUT, DELETE (note:  replicant)
// admin/ools GET (replicant), POST (unique, unrestricted)
// admin/ools/:id PUT, DELETE
// admin/userlinks GET (all) (creation is a user thing)
// admin/userlinks/:id PUT, DELETE (in case administrators need to do something)


// const adminUserRoutes = require('./adminUserRoutes');
// const adminOolRoutes = require('./adminOolRoutes');
// const adminUserLinkRoutes = require('./adminUserLinkRoutes');
 
// router.use('/users', adminUserRoutes);
// router.use('/ools', adminOolRoutes);
// router.use('/userlinks', adminUserLinkRoutes);

module.exports = router;