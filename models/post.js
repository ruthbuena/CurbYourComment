module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    user name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "bruh"
    }
  });
  return Post;
};
