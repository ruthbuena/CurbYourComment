
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

  // Giving the postCategorySelect a default value
  // Adding an event listener for when the form is submitted
  var form = $("#sign-up");

  $(form).on("submit", function handleFormSubmit(event) {

    event.preventDefault();

    var url = window.location.origin;

    // Getting jQuery references to the post body, title, form, and category select
    var usernameInput = $("#user-name"),
      passwordInput = $("#password"),
      confirmPasswordInput = $('#confirmPassword'),
      nameInput = $("#name"),
      emailInput = $("#email"),

      // new user object outlining user inputted properties
      newUser = {
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim(),
        confirmPassword: confirmPasswordInput.val().trim(),
        name: nameInput.val().trim(),
        email: emailInput.val().trim()
      };

    // long if then statement, making sure passwords match and no fields were left uncompleted before posting the data
    function validateNewUserData() {
      !newUser.username || !newUser.password || !newUser.confirmPassword || !newUser.name || !newUser.email ?
        alert('All fields are required. Please fill out accordingly.') :
        newUser.password !== newUser.confirmPassword ? alert('Your passwords don\'t match!') : postNewUserData();
    };

    // posts the data
    function postNewUserData() {
      console.log(newUser);
      $.post('/api/users', newUser, function(req, res) {
        console.log('new user added');

        // clears inputs once posted
        $(usernameInput).val('');
        $(passwordInput).val('');
        $(confirmPasswordInput).val('');
        $(nameInput).val('');
        $(emailInput).val('');

        // toggles modal (obviously)
        $('#myModal').modal('toggle');
      });

      // leads user to blog page once they finished signing up
      $('#continueToSite').on('click', function() {
        window.location.href = '/blog';
      });
    };

    validateNewUserData();

  });
});
