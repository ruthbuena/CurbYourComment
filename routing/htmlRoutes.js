const express = require('express'),
  path = require('path'),
  app = express();

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/home.html'))
  });

  app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/loginCreate.html'))
  });

};
