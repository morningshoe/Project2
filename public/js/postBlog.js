var blogSubmit = $(".blogbut");
var formDescription = $("#blogPostDescription")
var formTitle = $("#colFormLabelSm");
var formBody = $("#blogPostBody");
var formImage = $(".image_url");
var imageUrl = null;


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
    description: formDescription.val().trim(),
    body: formBody.val().trim(),
    image: imageUrl
  }
  console.log(post);
  if (!(post.title || post.body || post.description || post.image)) {
    alert("Please fill out the form completely.");
    return;
  }
  
  API.savePost(post).then(function () {
    window.location.assign("/");
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

var feedback = function(res) {
  if (res.success === true) {
      imageUrl = res.data.link;
      var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
      document.querySelector('.status').classList.add('bg-success');
      document.querySelector('.status').innerHTML =
          'Image : ' + '<br><input class="image-url" value=\"' + get_link + '\"/>' + '<img class="img" alt="Imgur-Upload" src=\"' + get_link + '\"/>';
  }
};

new Imgur({
  clientid: '498f0d618b842ae', //You can change this ClientID
  callback: feedback

});
