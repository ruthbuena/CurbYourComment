$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?bro_id=23)
  var url = window.location.search;
  var broId;
  // Sets a flag for whether or not we're updating a bro to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the bro id from the url
  // In localhost:8080/cms?bro_id=1, broId is 1
  if (url.indexOf("?bro_id=") !== -1) {
    broId = url.split("=")[1];
    getbroData(broId);
  }

  // Getting jQuery references to the bro body, title, form, and category select
  var nameInput = $("#name");
  var ageInput = $("#age");
  var heightInput = $("#height");
  var weightInput = $("#weight");
  var photoInput = $("#photo");

  var updateForm = $("#create");



  // Adding an event listener for when the form is submitted
  $(updateForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the bro if we are missing a body or a title
    if (!nameInput.val().trim()) {
      return;
    }
    // Constructing a newbro object to hand to the database
    var newbro = {
      name: nameInput.val().trim(),
      age: ageInput.val().trim(),
      height: heightInput.val().trim(),
      weight: weightInput.val().trim(),
      photo: photoInput.val().trim(),
    };

    console.log(newbro);

    // If we're updating a bro run updatebro to update a bro
    // Otherwise run submitbro to update a whole new bro
    if (updating) {
      newbro.id = broId;
      updatebro(newbro);
    }
    else {
      submitbro(newbro);
    }
  });

  // Submits a new bro and brings user to home page upon completion
  function submitbro(bro) {
    $.post("/api/bros/", bro, function() {
      window.location.href = "/home";
    });
  }

  // Gets bro data for a bro if we're editing
  function getbroData(id) {
    $.get("/api/bros/" + id, function(data) {
      if (data) {
        // If this bro exists, prefill our cms forms with its data
        nameInput.val(data.name);
        ageInput.val(data.age);
        heightInput.val(data.height);
        weightInput.val(data.weight);
        photoInput.val(data.photo);

        // If we have a bro with this id, set a flag for us to know to update the bro
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given bro, bring user to the home page when done
  function updatebro(bro) {
    $.ajax({
      method: "PUT",
      url: "/api/bros",
      data: bro
    })
    .done(function() {
      window.location.href = "/home";
    });
  }
});
