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
      response.json().then(function(data) {
      displayTVResult(data);
      });
    }
  })
  .catch(function(error) {
    alert('Unable to connect to TV api');
  })
};

var displayTVResult = function(data) {
  const tvTitle = data.Title;
  const tvActor = data.Actors;
  const tvGenre = data.Genre;
  const tvWriter = data.Writer;
  const tvRuntime = data.Runtime;
  const tvReleaseDate = data.Released;
  const tvRated = data.Rated;
  const tvimdbRating = data.imdbRating;
  const tvPoster = data.Poster;
  const tvPlot = data.Plot;

  // set actor
  const tvActorEl = document.createElement('p');
  $(tvActorEl).attr('class', 'tv-results');
  $(tvActorEl).html('<strong>Actors:</strong> ' + tvActor);
  $('#media-data').append(tvActorEl);

  // set genre
  const tvGenreEl = document.createElement('p');
  $(tvGenreEl).attr('class', 'tv-results');
  $(tvGenreEl).html('<strong>Genre:</strong> ' + tvGenre);
  $('#media-data').append(tvGenreEl);

  // set writer
  const tvWriterEl = document.createElement('p');
  $(tvWriterEl).attr('class', 'tv-results');
  $(tvWriterEl).html('<strong>Writer:</strong> ' + tvWriter);
  $('#media-data').append(tvWriterEl);

  // set runtime
  const tvRuntimeEl = document.createElement('p');
  $(tvRuntimeEl).attr('class', 'tv-results');
  $(tvRuntimeEl).html('<strong>Runtime:</strong> ' + tvRuntime);
  $('#media-data').append(tvRuntimeEl);

  // set released
  const tvReleasedEl = document.createElement('p');
  $(tvReleasedEl).attr('class', 'tv-results');
  $(tvReleasedEl).html('<strong>Released:</strong> ' + tvReleaseDate);
  $('#media-data').append(tvReleasedEl);

  // set rated
  const tvRatedEl = document.createElement('p');
  $(tvRatedEl).attr('class', 'tv-results');
  $(tvRatedEl).html('<strong>Rated:</strong> ' + tvRated);
  $('#media-data').append(tvRatedEl);

  // set imdbrating
  const tvImdbEl = document.createElement('p');
  $(tvImdbEl).attr('class', 'tv-results');
  $(tvImdbEl).html('<strong>IMDB Rating:</strong> ' + tvimdbRating);
  $('#media-data').append(tvImdbEl);

  // set plot
  const tvPlotEl = document.createElement('p');
  $(tvPlotEl).attr('class', 'tv-results');
  $(tvPlotEl).html('<strong>Plot:</strong> ' + tvPlot);
  $('#media-data').append(tvPlotEl);

  // set poster
  $('#media-art').append('<img src="' + tvPoster + '" alt="' + tvTitle + '"/>');
};

var display = function() {
  $('#search-results').removeClass('hide');
};