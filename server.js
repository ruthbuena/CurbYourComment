const
  mysql = require('mysql');

bodyParser = require('body-parser');

Sequelize = require('sequelize');

connection = mysql.createConnection({
  database: 'brocial_networkDB',
  Host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
});
