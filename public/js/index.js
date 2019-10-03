$submitBtn = (".blogbut");
$formTitle = ("#colFormLabelSm");
$formBody = ("#blogPostBody");
$formImage = (".image_url");
var API = {
    savePost: function (post) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/posts",
            data: JSON.stringify(post)
        });
    }
};
var handleFormSubmit = function (event) {
    event.preventDefault();

    var post = {
        title: $formTitle.val().trim(),
        body: $formBody.val().trim(),
        image: $formImage.val().trim()
    }

    if (!(post.title && post.description && post.image)) {
        alert("You must enter an example text and description!");
        return;
    }

    API.savePost(post).then(function () {
        window.location.href("home");
    });

}

$submitBtn.on("click", handleFormSubmit)

// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function (example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function () {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function (id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function () {
//   API.getExamples().then(function (data) {
//     var $examples = data.map(function (example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function (event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function () {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function () {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function () {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

// $("document").ready(function() {

//   $("input[type=file]").on("change", function() {

//     var $files = $(this).get(0).files;

//     if ($files.length) {

//       // Reject big files
//       if ($files[0].size > $(this).data("max-size") * 1024) {
//         console.log("Please select a smaller file");
//         return false;
//       }

//       // Begin file upload
//       console.log("Uploading file to Imgur..");

//       // Replace ctrlq with your own API key
//       var apiUrl = "https://api.imgur.com/3/image";
//       var apiKey = 'ctrlq';

//       var settings = {
//         async: false,
//         crossDomain: true,
//         processData: false,
//         contentType: false,
//         type: 'POST',
//         url: apiUrl,
//         headers: {
//           Authorization: '498f0d618b842ae ' + apiKey,
//           Accept: 'application/json'
//         },
//         mimeType: 'multipart/form-data'
//       };

//       var formData = new FormData();
//       formData.append("image", $files[0]);
//       settings.data = formData;

//       // Response contains stringified JSON
//       // Image URL available at response.data.link
//       $.ajax(settings).done(function(response) {
//         console.log(response);
//       });

//     }
//   });
// });
