$(document).ready(function() {
  /* global moment */
  // home Container holds all of our bros
  var homeContainer = $(".home-container");

  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlebroDelete);
  $(document).on("click", "button.edit", handlebroEdit);
  broCategorySelect.on("change", handleCategoryChange);
  var bros;

  // This function grabs bros from the database and updates the view
  function getbros(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/bros" + categoryString, function(data) {
      console.log("bros", data);
      bros = data;
      if (!bros || !bros.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete bros
  function deletebro(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/bros/" + id
    })
    .done(function() {
      getbros(broCategorySelect.val());
    });
  }

  // Getting the initial list of bros
  getbros();
  // InitializeRows handles appending all of our constructed bro HTML inside
  // homeContainer
  function initializeRows() {
    homeContainer.empty();
    var brosToAdd = [];
    for (var i = 0; i < bros.length; i++) {
      brosToAdd.push(createNewRow(bros[i]));
    }
    homeContainer.append(brosToAdd);
  }

  // This function constructs a bro's HTML
  function createNewRow(bro) {
    var newbroPanel = $("<div>");
    newbroPanel.addClass("panel panel-default");
    var newbroPanelHeading = $("<div>");
    newbroPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newbroTitle = $("<h2>");
    var newbroDate = $("<small>");
    var newbroCategory = $("<h5>");
    newbroCategory.text(bro.category);
    newbroCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });
    var newbroPanelBody = $("<div>");
    newbroPanelBody.addClass("panel-body");
    var newbroBody = $("<p>");
    newbroTitle.text(bro.title + " ");
    newbroBody.text(bro.body);
    var formattedDate = new Date(bro.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newbroDate.text(formattedDate);
    newbroTitle.append(newbroDate);
    newbroPanelHeading.append(deleteBtn);
    newbroPanelHeading.append(editBtn);
    newbroPanelHeading.append(newbroTitle);
    newbroPanelHeading.append(newbroCategory);
    newbroPanelBody.append(newbroBody);
    newbroPanel.append(newbroPanelHeading);
    newbroPanel.append(newbroPanelBody);
    newbroPanel.data("bro", bro);
    return newbroPanel;
  }

  // This function figures out which bro we want to delete and then calls
  // deletebro
  function handlebroDelete() {
    var currentbro = $(this)
      .parent()
      .parent()
      .data("bro");
    deletebro(currentbro.id);
  }

  // This function figures out which bro we want to edit and takes it to the
  // Appropriate url
  function handlebroEdit() {
    var currentbro = $(this)
      .parent()
      .parent()
      .data("bro");
    window.location.href = "/create?bro_id=" + currentbro.id;
  }

  // This function displays a messgae when there are no bros
  function displayEmpty() {
    homeContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No bros yet for this category, navigate <a href='/create'>here</a> in order to create a new bro.");
    homeContainer.append(messageh2);
  }

  // This function handles reloading new bros when the category changes
  function handleCategoryChange() {
    var newbroCategory = $(this).val();
    getbros(newbroCategory);
  }

});
