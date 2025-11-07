module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('table', {
    tableID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tableName: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    location: DataTypes.STRING
  }, { timestamps: true });

  return Table;
};
