const bookAPIKey = "AIzaSyAWyw1BzmR-6qJOC2A1-G0l_CqKVCN8N4s"
const movieAPIKey = "ec8e125d"
const mediaInputEl = document.getElementById('search-media');
const dropDownEl = document.getElementById('media-selector');

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
  const optionEl = document.getElementById('media-selector');

    // get result based on media type, unless input left blank
    if (optionEl.value === "1") {
      lookBookData(searchMedia);
      $('#search-media').val('');
    } else if (optionEl.value === "2"){
      lookMovieData(searchMedia);
      $('#search-media').val('');
    } else if (optionEl.value === "3"){
      lookTVData(searchMedia);
      $('#search-media').val('');
    } else {
      alert('Please enter a valid title.');
    }

  // display & hide items on page
  display();
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

// function to get movie data
var lookMovieData = function(movie) {
  var movieApiUrl = "https://www.omdbapi.com/?apikey=" + movieAPIKey + "&t=" + movie + "&r=json";

  fetch(movieApiUrl)
  .then(function(response){
    if (response.ok){
      console.log(response)
      response.json().then(function(title){
      console.log(title);
    });
  }
  })
  .catch(function(error){
    alert('Unable to connect to book api')
  });
}

// function to get tv data
var lookTVData = function(tv) {
  var tvApiUrl = "https://www.omdbapi.com/?apikey=" + movieAPIKey + "&t=" + tv + "&r=json";

  fetch(tvApiUrl)
  .then(function(response) {
    if (response.ok) {
      console.log(response)
      response.json().then(function(data) {
      console.log(data);
      });
    }
  })
  .catch(function(error) {
    alert('Unable to connect to TV api');
  })
};

var display = function() {
  $('#search-results').removeClass('hide');
};