module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height_inches: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'some link'
    },
  }, {
    timestamps: true
  });
  return User;
};
