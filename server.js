const
  mysql = require('mysql'),

  bodyParser = require('body-parser'),

  Sequelize = require('sequelize'),

  connection = mysql.createConnection({
    database: 'brocial_networkDB',
    Host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
  }),

  express = require('express'),
  path = require('path'),
  app = express(),
  PORT = process.env.PORT || 8080;

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
