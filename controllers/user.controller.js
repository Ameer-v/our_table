const md5 = require('md5');
const { User } = require('../models');

exports.getAllUser = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] }});
  res.json({ success:true, data: users, message: 'All users loaded' });
};

exports.findUser = async (req, res) => {
  const key = req.params.key;
  const Op = require('sequelize').Op;
  const users = await User.findAll({
    where: {
      [Op.or]: [
        { firstname: { [Op.substring]: key } },
        { lastname: { [Op.substring]: key } },
        { email: { [Op.substring]: key } }
      ]
    },
    attributes: { exclude: ['password'] }
  });
  res.json({ success:true, data: users, message: 'Filter users' });
};

exports.addUser = async (req, res) => {
  try {
    const data = req.body;
    data.password = md5(data.password);
    const user = await User.create(data);
    res.json({ success:true, data: user, message: 'New user inserted' });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (data.password) data.password = md5(data.password);
    await User.update(data, { where: { userID: id }});
    res.json({ success:true, message: 'User updated' });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.destroy({ where: { userID: id }});
    res.json({ success:true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};
