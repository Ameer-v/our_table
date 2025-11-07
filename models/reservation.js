module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('reservation', {
    reservationID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userID: { type: DataTypes.INTEGER, allowNull: false },
    tableID: { type: DataTypes.INTEGER, allowNull: false },
    reservationDate: { type: DataTypes.DATE, allowNull: false },
    pax: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('booked','completed','cancelled'), defaultValue: 'booked' }
  }, { timestamps: true });

  return Reservation;
};
