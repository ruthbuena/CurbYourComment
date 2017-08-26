var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {

  var Bro = sequelize.define('Bro', {
      name: {
          type: Sequelize.STRING,
          field: 'color'
      },
      age: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: 'age'
      },
      heightInches: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: 'height'
      },
      weightLbs: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          field: 'age'
      },
      imageUrl: {
          type: Sequelize.STRING,
          allowNull: true,
          field: 'imageUrl'
      },
  });

  module.exports = Bro;

  return Bro;
};
