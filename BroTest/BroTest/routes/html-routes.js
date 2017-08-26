var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {


  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/create", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/create.html"));
  });

  // update route loads update.html
  app.get("/update", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/update.html"));
  });

};
