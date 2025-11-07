const { Menu } = require('../models');
const upload = require('./upload-image').single('image');
const fs = require('fs');
const path = require('path');

exports.getAllMenu = async (req, res) => {
  const menus = await Menu.findAll();
  res.json({ success:true, data: menus, message: 'All menu loaded' });
};

exports.findMenu = async (req,res) => {
  const key = req.params.key;
  const Op = require('sequelize').Op;
  const menus = await Menu.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.substring]: key } },
        { description: { [Op.substring]: key } }
      ]
    }
  });
  res.json({ success:true, data: menus });
};

exports.addMenu = (req, res) => {
  upload(req, res, async err => {
    if (err) return res.status(400).json({ success:false, message: err.message });
    if (!req.file) return res.status(400).json({ success:false, message: 'No image uploaded' });

    try {
      const { name, description, price } = req.body;
      const menu = await Menu.create({
        name, description, price, image: req.file.filename
      });
      res.json({ success:true, data: menu, message: 'Menu added' });
    } catch (error) {
      res.status(500).json({ success:false, message: error.message });
    }
  });
};

exports.updateMenu = async (req, res) => {
  upload(req, res, async err => {
    if (err) return res.status(400).json({ success:false, message: err.message });
    const id = req.params.id;
    const data = { name: req.body.name, description: req.body.description, price: req.body.price };
    try {
      if (req.file) {
        const menu = await Menu.findOne({ where: { menuID: id }});
        if (menu && menu.image) {
          const p = path.join(__dirname, '../uploads', menu.image);
          if (fs.existsSync(p)) fs.unlinkSync(p);
        }
        data.image = req.file.filename;
      }
      await Menu.update(data, { where: { menuID: id }});
      res.json({ success:true, message: 'Menu updated' });
    } catch (error) {
      res.status(500).json({ success:false, message: error.message });
    }
  });
};

exports.deleteMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const menu = await Menu.findOne({ where: { menuID: id }});
    if (menu && menu.image) {
      const p = path.join(__dirname, '../uploads', menu.image);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
    await Menu.destroy({ where: { menuID: id }});
    res.json({ success:true, message: 'Menu deleted' });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};
