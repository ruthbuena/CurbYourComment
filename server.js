const
  bodyParser = require('body-parser'),
  Sequelize = require('sequelize'),
  express = require('express'),
  path = require('path'),
  app = express(),
  PORT = process.env.PORT || 8080;

var db = require('./models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

app.use(express.static('public'));

require('./routing/apiRoutes.js')(app);
require('./routing/htmlRoutes.js')(app);
require('./routing/postRoutes.js')(app);

db.sequelize.sync({
  force: true
}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
