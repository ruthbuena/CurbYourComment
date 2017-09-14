var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    createUser = function(newUser, callback) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                newUser.password = hash;
                newUser.save(callback);
            });
        });
    }

    getUserByUsername = function(username, callback) {
        var query = { username: username };
        User.findOne(query, callback);
    }

    getUserById = function(id, callback) {
        User.findById(id, callback);
    }

    comparePassword = function(candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if (err) throw err;
            callback(null, isMatch);
        });
    }

    User.associate = function(models) {
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };

    return User;
};