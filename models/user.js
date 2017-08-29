module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user' {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    }
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
      defaultValue: 'n/a'
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 'n/a'
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'some link'
    },
  });

  var Account = sequelize.define('account' {
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
    timestamps: true
  });
}
