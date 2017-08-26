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
  var descriptionInput = $("#description");
  var userNameInput = $("#user-name");
  var signUpForm = $("#sign-up");
  var CategorySelect = $("#category");
  // Giving the postCategorySelect a default value
  postCategorySelect.val("bruh");
  // Adding an event listener for when the form is submitted
  $(signUpForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!userNameInput.val().trim() || !descriptionInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newUser = {
      user-name: userNameInput.val().trim(),
      description: descriptionInput.val().trim(),
      category: CategorySelect.val()
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
    $.post("/api/posts/", Post, function() {
      window.location.href = "/newusers";
    });
  }

  // Gets post data for a post if we're editing
  function getPostData(id) {
    $.get("/api/posts/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        userNameInput.val(data.title);
        descriptionInput.val(data.body);
        CategorySelect.val(data.category);
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
      url: "/api/posts",
      data: post
    })
    .done(function() {
      window.location.href = "/newusers";
    });
  }
});

