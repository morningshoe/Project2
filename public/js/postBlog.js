var blogSubmit = $(".blogbut");
var formTitle = $("#colFormLabelSm");
var formBody = $("#blogPostBody");
var formImage = $(".image_url");

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
        title: formTitle.val().trim(),
        body: formBody.val().trim(),
        image: formImage.val().trim()
    }

    if (!(post.title && post.description && post.image)) {
        alert("You must enter an example text and description!");
        return;
    }

    API.savePost(post).then(function () {
        window.location.href("home");
    });

}

blogSubmit.on("click", handleFormSubmit)

$("document").ready(function() {

  $("input[type=file]").on("change", function() {

    var $files = $(this).get(0).files;

    if ($files.length) {

      // Reject big files
      if ($files[0].size > $(this).data("max-size") * 1024) {
        console.log("Please select a smaller file");
        return false;
      }

      // Begin file upload
      console.log("Uploading file to Imgur..");

      // Replace ctrlq with your own API key
      var apiUrl = "https://api.imgur.com/3/image";
      var apiKey = 'ctrlq';

      var settings = {
        async: false,
        crossDomain: true,
        processData: false,
        contentType: false,
        type: 'POST',
        url: apiUrl,
        headers: {
          Authorization: '498f0d618b842ae ' + apiKey,
          Accept: 'application/json'
        },
        mimeType: 'multipart/form-data'
      };

      var formData = new FormData();
      formData.append("image", $files[0]);
      settings.data = formData;

      // Response contains stringified JSON
      // Image URL available at response.data.link
      $.ajax(settings).done(function(response) {
        console.log(response);
      });

    }
  });
});
