const
  express = require('express'),
  path = require('path'),
  app = express();

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.redirect('/home');
  });

  app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/home.html'))
  });

  app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/signup.html'))
  });

  // blog route loads blog.html
  app.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  app.get('/post', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/post.html'))
  });
  app.get('/login', function (req, res) {
    res.render('login');
  })

};
