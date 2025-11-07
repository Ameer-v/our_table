const jwt = require('jsonwebtoken');
const { secret } = require('../controllers/auth.controller');

exports.authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ success:false, auth:false, message: 'User Unauthorized' });
  const token = authHeader.split(' ')[1];
  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ success:false, auth:false, message: 'Invalid token' });
  }
};
