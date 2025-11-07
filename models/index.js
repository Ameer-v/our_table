const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = require('./user')(sequelize, DataTypes);
const Table = require('./table')(sequelize, DataTypes);
const Menu = require('./menu')(sequelize, DataTypes);
const Reservation = require('./reservation')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);

User.hasMany(Reservation, { foreignKey: 'userID' });
Reservation.belongsTo(User, { foreignKey: 'userID' });

Table.hasMany(Reservation, { foreignKey: 'tableID' });
Reservation.belongsTo(Table, { foreignKey: 'tableID' });

Reservation.hasMany(Order, { foreignKey: 'reservationID' });
Order.belongsTo(Reservation, { foreignKey: 'reservationID' });

Menu.hasMany(Order, { foreignKey: 'menuID' });
Order.belongsTo(Menu, { foreignKey: 'menuID' });

module.exports = {
  sequelize,
  User,
  Table,
  Menu,
  Reservation,
  Order
};
