$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)

  // var postId;
  // // Sets a flag for whether or not we're updating a post to be false initially
  // var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  // if (url.indexOf("?post_id=") !== -1) {
  //   postId = url.split("=")[1];
  //   getPostData(postId);
  // }

  // Giving the postCategorySelect a default value
  // Adding an event listener for when the form is submitted
  var form = $("#sign-up");

  $(form).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    var url = window.location.origin;
    // Getting jQuery references to the post body, title, form, and category select

    var usernameInput = $("#user-name"),
      passwordInput = $("#password"),
      confirmPasswordInput = $('#confirmPassword'),
      nameInput = $("#name"),
      emailInput = $("#email");

    // Constructing a newPost object to hand to the database
    var newUser = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
      confirmPassword: confirmPasswordInput.val().trim(),
      name: nameInput.val().trim(),
      email: emailInput.val().trim()
    };

    validateData();


    function validateData() {
      if (!newUser.username || !newUser.password || !newUser.confirmPassword || !newUser.name || !newUser.email) {
        alert('All fields are required. Please fill out accordingly.');
      } else if (newUser.password !== newUser.confirmPassword) {
        alert('Your passwords don\'t match!');
      } else {
        console.log(newUser);
        $.post('/api/users', newUser, function(req, res) {
          console.log('new user added');
          $(usernameInput).val('');
          $(passwordInput).val('');
          $(confirmPasswordInput).val('');
          $(nameInput).val('');
          $(emailInput).val('');
        });
      };
    };
  });
});



// If we're updating a post run updatePost to update a post
// Otherwise run submitPost to create a whole new post
//   if (updating) {
//     newUser.id = postId;
//     updatePost(newUser);
//   } else {
//     submitPost(newUser);
//   }
// });

// Submits a new post and brings user to blog page upon completion
// function submitPost(Post) {
//   $.post("/api/users/", Post, function() {
//     window.location.href = "/user";
//   });
// }

// Gets post data for a post if we're editing
// function getPostData(id) {
//   $.get("/api/uers/" + id, function(data) {
//     if (data) {
//       // If this post exists, prefill our cms forms with its data
//       usernameInput.val(data.user - name);
//       passwordInput.val(data.password);
//       nameInput.val(data.name);
//       ageInput.val(data.age);
//       heightinchesInput.val(data.height_inches);
//       weightInput.val(data.weight);
//       photoInput.val(data.photo);
//       // postCategorySelect.val(data.category);
//       // If we have a post with this id, set a flag for us to know to update the post
//       // when we hit submit
//       updating = true;
//     }
//   });
// }

// Update a given post, bring user to the blog page when done
// function updatePost(post) {
//   $.ajax({
//       method: "PUT",
//       url: "/api/users",
//       data: post
//     })
//     .done(function() {
//       window.location.href = "/user";
//     });
// }
