const router = require('express').Router();

// subs/register POST (register)
// subs/login POST (login)
// subs/:id PUT DELETE (they can edit or delete themselves)
// subs/ools GET ALL (replicant), POST (unique, RESTRICTED access)
// subs/userlinks GET (only for the sub), POST
// subs/userlinks/:id PUT, DELETE

const subUserRoutes = require('./subUserRoutes');
const subOolRoutes = require('./subOolRoutes');
const subUserLinkRoutes = require('./subUserLinkRoutes');
 
router.use('/users', subUserRoutes);
router.use('/ools', subOolRoutes);
router.use('/userlinks', subUserLinkRoutes);

module.exports = router;