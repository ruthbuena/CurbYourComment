
var countDownDate = new Date("Oct 1, 2017 22:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is over, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);


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
