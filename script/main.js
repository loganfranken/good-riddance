(function() {

  var MAX_IMAGES = 3;

  var loadedImages = 0;
  var container = document.getElementById('container');

  try
  {
    var urlHash = window.location.hash;

    // Strip the hash (#)
    var imageUrlList = urlHash.substring(1);
    var imageUrls = imageUrlList.split(',');

    if(imageUrls.length != MAX_IMAGES) {
      displayError("Only three images are supported");
      return;
    }

    imageUrls.forEach(function(imageUrl, index) {

      if(!/^[A-Za-z0-9]+\.(jpg|png|gif)$/.test(imageUrl))
      {
        throw "Invalid image URL specified";
      }

      var image = new Image();
      image.src = '//i.imgur.com/' + imageUrl;
      image.onload = function() { onImageLoad(image, index); };

    });
  }
  catch(err)
  {
    displayError(err);
  }

  function onImageLoad(image, index) {

    loadedImages++;

    image.id = "image-" + index;
    container.appendChild(image);

    if(loadedImages === MAX_IMAGES) {
      onAllImagesLoaded();
    }

  }

  function onAllImagesLoaded() {

    container.className = "playing";

    var song = new Audio('assets/good_riddance.mp3');
    song.play();

  }

  function displayError(errorMessage) {
    document.getElementById('status').innerHTML = errorMessage;
  }

})();
