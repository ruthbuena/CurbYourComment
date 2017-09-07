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

  // POST route for saving a new user
  app.post("/api/users", function(req, res) {
    console.log(req.body);
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email
    }).then(function(results) {
      res.end();
    });
  });

  app.post('/api/posts', function(req, res) {
    console.log(req.body);
    db.Post.create({
      title: req.body.title,
      body: req.body.body
    }).then(function(results) {
      res.end();
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
// app.delete("/api/users/:id", function(req, res) {
//   db.User.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(function(dbUser) {
//     res.json(dbUser);
//   });
// });
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
