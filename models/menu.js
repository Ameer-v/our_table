module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('menu', {
    menuID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, { timestamps: true });

  return Menu;
};
