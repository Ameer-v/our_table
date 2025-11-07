const { body, validationResult } = require('express-validator');

exports.validateUser = [
  body('firstname').notEmpty().withMessage('First name required'),
  body('lastname').notEmpty().withMessage('Last name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
  (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msg = errors.array().map(e => e.msg).join(', ');
      return res.status(422).json({ success:false, message: msg });
    }
    next();
  }
];
