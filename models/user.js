module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: { type: DataTypes.ENUM('admin','user'), defaultValue: 'user' }
  }, {
    timestamps: true
  });

  return User;
};
