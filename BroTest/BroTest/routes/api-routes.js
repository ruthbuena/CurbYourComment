var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the bros
  app.get("/api/bros/", function(req, res) {
    db.Bro.findAll({})
    .then(function(dbbro) {
      res.json(dbbro);
    });
  });

  // Get route for returning bros of a specific category
  app.get("/api/bros/category/:category", function(req, res) {
    db.Bro.findAll({
      where: {
        category: req.params.category
      }
    })
    .then(function(dbbro) {
      res.json(dbbro);
    });
  });

  // Get rotue for retrieving a single bro
  app.get("/api/bros/:id", function(req, res) {
    db.Bro.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbbro) {
      res.json(dbbro);
    });
  });

  // bro route for saving a new bro
  app.post("/api/bros", function(req, res) {
    console.log(req.body);
    db.Bro.create({
      name: req.body.name,
      age: req.body.age,
      height: req.body.height,
      weight: req.body.weight,
      photo: req.body.photo,
      category: req.body.category
    })
    .then(function(dbbro) {
      res.json(dbbro);
    });
  });

  // DELETE route for deleting bros
  app.delete("/api/bros/:id", function(req, res) {
    db.Bro.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbbro) {
      res.json(dbbro);
    });
  });

  // PUT route for updating bros
  app.put("/api/bros", function(req, res) {
    var bro = {
      name: req.body.name,
      age: req.body.age,
      height: req.body.height,
      weight: req.body.weight,
      photo: req.body.photo,
      category: req.body.category
    }
    db.Bro.update(bro,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(dbbro) {
      res.json(dbbro);
    });
  });
};
