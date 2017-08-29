const
  mysql = require('mysql'),
  bodyParser = require('body-parser'),
  Sequelize = require('sequelize'),
  express = require('express'),
  path = require('path'),

  // connection = mysql.createConnection({
  //   database: 'brocial_networkDB',
  //   Host: 'localhost',
  //   user: 'root',
  //   password: 'root',
  //   port: 3306,
  // }),


  app = express(),
  PORT = process.env.PORT || 8080,

  sequelize = new Sequelize('brocial_networkDB', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

app.listen(PORT, function() {
  console.log("server is listening on PORT: " + PORT);
});
