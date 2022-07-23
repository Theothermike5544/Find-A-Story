const bookAPIKey = "AIzaSyAWyw1BzmR-6qJOC2A1-G0l_CqKVCN8N4s"
const movieAPIKey = "ec8e125d"
const mediaInputEl = document.getElementById('search-media');

// set up dropdown function for search input
$(document).ready(function(){
    $('select').formSelect();
  });

// disable the enter key from being utilized with the search function
$(document).keypress(
    function (event) {
        if (event.which == '13') {
            event.preventDefault();
        }
    });

// Search Button functionality
$('#submit-btn').on('click', function(event) {
event.preventDefault();
    let searchMedia = mediaInputEl.value.trim();

    // get result unless input left blank
    if (searchMedia) {
      lookBookData(searchMedia);
      $('#search-media').val('');
    } else {
      alert('Please enter a valid title.');
    }
});

// function to get book data
var lookBookData = function(book) {
  var bookApiUrl = "https://www.googleapis.com/books/v1/volumes" + "?q=" + book + "&api-key=" + bookAPIKey;

  fetch(bookApiUrl)
  .then(function(response) {
    if (response.ok) {
      console.log(response)
      response.json().then(function(data) {
      console.log(data.items[0].volumeInfo);
      console.log(data.items[0].volumeInfo.title);
      });
    }
  })
  
  .catch(function(error) {
    alert('Unable to connect to book api');
});
}