function subOnly(req, res, next) {
  if (req.user && req.user.role === 'sub') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Subs only.' });
  }
}

module.exports = subOnly;