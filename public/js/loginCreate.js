$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var postId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var signupForm = $("sign-up");
  var usernameInput = $("#user-name");
  var passwordInput = $("#password");
  var nameInput = $("#name");
  var ageInput = $("#age");
  var heightinchesInput = $("#height_inches");
  var weightInput = $("#weight");
  var photoInput = $("#photo");
  // var genderCategory = $("#category");
  // Giving the postCategorySelect a default value
  // genderCategory.val("Male");
  // Adding an event listener for when the form is submitted
  $(signupForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!usernameInput.val().trim() || !passwordInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newUser = {
      user-name: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
      name: nameInput.val().trim(),
      age: ageInput.val().trim(),
      height_inches: heightinchesInput.val().trim(),
      weight: weightInput.val().trim(),
      photo: photoInput.val().trim()
      // category: genderCategory.val()
    };

    console.log(newUser);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newUser.id = postId;
      updatePost(newUser);
    }
    else {
      submitPost(newUser);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitPost(Post) {
    $.post("/api/users/", Post, function() {
      window.location.href = "/user";
    });
  }

  // Gets post data for a post if we're editing
  function getPostData(id) {
    $.get("/api/uers/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        usernameInput.val(data.user-name);
        passwordInput.val(data.password);
        nameInput.val(data.name);
        ageInput.val(data.age);
        heightinchesInput.val(data.height_inches);
        weightInput.val(data.weight);
        photoInput.val(data.photo);
        // postCategorySelect.val(data.category);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/users",
      data: post
    })
    .done(function() {
      window.location.href = "/user";
    });
  }
});