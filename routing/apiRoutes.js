
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/userModel.js');

// Requiring our Todo model
var db = require('../models');

// Routes
// =============================================================
module.exports = function(app) {

  console.log(db.User);

  // GET route for getting all of the users
  app.get("/api/users", function(req, res) {
    var query = {};
    if (req.query.username) {
      query.username = req.query.username;
    };
    db.User.findAll({
      where: query
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post('/api/users', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.getValidationResult();

    if(errors){
      res.render('/api/users',{
        errors: errors
      });
    } else {
      var newUser = new User({
        name: name,
        email:email,
        username: username,
        password: password
      });

      User.createUser(newUser, function(err, user){
        if(err) throw err;
        console.log(user);
      });

      req.flash('success_msg', 'You are registered and can now login');

      res.redirect('/users/login');
    }
});

passport.use('local-signin', new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }

    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) throw err;
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid Password'});
      }
    });
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

  // POST route for saving a new user
  // app.post("/api/users", function(req, res) {
  //   console.log(req.body);
  //   db.User.create({
  //     username: req.body.username,
  //     password: req.body.password,
  //     name: req.body.name,
  //     email: req.body.email
  //   }).then(function(results) {
  //     res.end();
  //   });
  // });

  app.post('/api/posts', function(req, res) {
    console.log(req.body);
    db.Post.create({
      title: req.body.title,
      body: req.body.body
    }).then(function(results) {
      res.end();
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });

  app.put("/api/posts", function(req, res) {
    console.log('asdf');
    db.Post.update(
      req.body, {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

};

// // Get route for returning users of a specific category
// app.get("/api/users/category/:category", function(req, res) {
//   db.User.findAll({
//     where: {
//       // category: req.params.category
//     }
//   })
//   .then(function(dbUser) {
//     res.json(dbUser);
//   });
// });

// Get rotue for retrieving a single user
// app.get("/api/users/:id", function(req, res) {
//   db.User.findOne({
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(function(dbUser) {
//     res.json(dbUser);
//   });
// });



// DELETE route for deleting users

//
// // PUT route for updating users
// app.put("/api/users", function(req, res) {
//   var user = {
//     username: req.body.username,
//     password: req.body.password,
//     name: req.body.name,
//     email: req.body.email
//   }
//   db.User.update(user,
//     {
//       where: {
//         id: req.body.id
//       }
//     })
//   .then(function(dbUser) {
//     res.json(dbUser);
//   });
// });
