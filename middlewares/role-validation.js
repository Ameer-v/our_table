exports.IsAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ success:false, auth:false, message: 'Forbidden! Not admin' });
};

exports.IsUser = (req, res, next) => {
  if (req.user && (req.user.role === 'user' || req.user.role === 'admin')) return next();
  return res.status(403).json({ success:false, auth:false, message: 'Forbidden! Not user' });
};
