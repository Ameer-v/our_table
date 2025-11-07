const { Table } = require('../models');

exports.getAllTable = async (req, res) => {
  const tables = await Table.findAll();
  res.json({ success:true, data: tables, message: 'All tables loaded' });
};

exports.addTable = async (req, res) => {
  try {
    const { tableName, capacity, location } = req.body;
    const t = await Table.create({ tableName, capacity, location });
    res.json({ success:true, data: t, message: 'Table added' });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

exports.updateTable = async (req,res) => {
  try {
    await Table.update(req.body, { where: { tableID: req.params.id }});
    res.json({ success:true, message: 'Table updated' });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

exports.deleteTable = async (req,res) => {
  try {
    await Table.destroy({ where: { tableID: req.params.id }});
    res.json({ success:true, message: 'Table deleted' });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};
