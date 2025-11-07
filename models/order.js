module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    orderID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    reservationID: { type: DataTypes.INTEGER, allowNull: false },
    menuID: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
  }, { timestamps: true });

  return Order;
};
