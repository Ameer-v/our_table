const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'resto_secret_key';

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ success:false, message: 'Email already used' });

    const newUser = await User.create({
      firstname, lastname, email, password: md5(password), role: role || 'user'
    });
    return res.json({ success: true, data: newUser, message: 'User registered' });
  } catch (err) {
    return res.status(500).json({ success:false, message: err.message });
  }
};

exports.authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password: md5(password) }});
    if (!user) return res.status(401).json({ success:false, logged:false, message: 'Authentication Failed' });

    const payload = { userID: user.userID, role: user.role };
    const token = jwt.sign(payload, secret, { expiresIn: '8h' });

    return res.json({ success:true, logged:true, token, data: user });
  } catch (err) {
    return res.status(500).json({ success:false, message: err.message });
  }
};

exports.secret = secret;
