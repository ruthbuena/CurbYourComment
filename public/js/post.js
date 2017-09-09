$(document).ready(function() {


  // grabs blog to throw event handler against
  var form = $("#blog");

  $(form).on("submit", function handleFormSubmit(event) {

    // prevents page refresh
    event.preventDefault();

    // Constructing a newPost object to hand to the database
    var url = window.location.origin,
      bodyInput = $('#body'),
      titleInput = $('#title'),
      newPost = {
        title: titleInput.val().trim(),
        body: bodyInput.val().trim()
      };

    // Wont submit the post if we are missing a body or a title
    function validatePostData() {
      !newPost.title || !newPost.body ? alert('Please give your post a title and some material!') : submitNewPost();
    };

    // Submits a new post and brings user to blog page upon completion
    function submitNewPost(post) {

      $.post('/api/posts', newPost, function() {
        console.log(newPost);
        $('#addPostModal').modal('toggle');
      });

      $('#continueToSite').on('click', function() {
        window.location.href = '/blog';
      });
    };

    validatePostData();

  });
});
