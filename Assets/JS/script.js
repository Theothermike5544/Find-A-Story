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
      response.json().then(function(data) {
      displayBOOKResult(data);
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
      response.json().then(function(data){
      displayMOVResult(data);
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

// display tv show results
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

  $('#media-title').html('');
  $('#media-art').html('');
  $('#media-data').html('');

  // set title
  $('#media-title').append(tvTitle);

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

  // set imdb rating
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

var displayMOVResult = function(data) {
  const movTitle = data.Title;
  const movActor = data.Actors;
  const movDirector = data.Director;
  const movGenre = data.Genre;
  const movRated = data.Rated;
  const movRuntime = data.Runtime;
  const movimdbRating = data.imdbRating;
  const movReleaseDate = data.Released;
  const movPoster = data.Poster;
  const movPlot = data.Plot;

  $('#media-art').html('');
  $('#media-data').html('');

  // set actor
  const movActorEl = document.createElement('p');
  $(movActorEl).attr('class', 'mov-results');
  $(movActorEl).html('<strong>Actors:</strong> ' + movActor);
  $('#media-data').append(movActorEl);

  // set director
  const movDirectorEl = document.createElement('p');
  $(movDirectorEl).attr('class', 'mov-results');
  $(movDirectorEl).html('<strong>Director:</strong> ' + movDirector);
  $('#media-data').append(movDirectorEl);

  // set genre
  const movGenreEl = document.createElement('p');
  $(movGenreEl).attr('class', 'mov-results');
  $(movGenreEl).html('<strong>Genre:</strong> ' + movGenre);
  $('#media-data').append(movGenreEl);

  // set rated
  const movRatedEl = document.createElement('p');
  $(movRatedEl).attr('class', 'mov-results');
  $(movRatedEl).html('<strong>Rated:</strong> ' + movRated);
  $('#media-data').append(movRatedEl);

  // set runtime
  const movRuntimeEl = document.createElement('p');
  $(movRuntimeEl).attr('class', 'mov-results');
  $(movRuntimeEl).html('<strong>Runtime:</strong> ' + movRuntime);
  $('#media-data').append(movRuntimeEl);

  // set imdb rating
  const movImdbEl = document.createElement('p');
  $(movImdbEl).attr('class', 'mov-results');
  $(movImdbEl).html('<strong>IMDB Rating:</strong> ' + movimdbRating);
  $('#media-data').append(movImdbEl);

  // set released
  const movReleaseDateEl = document.createElement('p');
  $(movReleaseDateEl).attr('class', 'mov-results');
  $(movReleaseDateEl).html('<strong>Release Date:</strong> ' + movReleaseDate);
  $('#media-data').append(movReleaseDateEl);

  // set plot
  const movPlotEl = document.createElement('p');
  $(movPlotEl).attr('class', 'mov-results');
  $(movPlotEl).html('<strong>Plot:</strong> ' + movPlot);
  $('#media-data').append(movPlotEl);

  // set poster
  $('#media-art').append('<img src="' + movPoster + '" alt="' + movTitle + '"/>');
};

var displayBOOKResult = function(data) {
    const bookVolumeInfo = data.items[0].volumeInfo
    const bookTitle = data.items[0].volumeInfo.title;
    const bookAuthors = data.items[0].volumeInfo.authors;
    const bookPublisher = data.items[0].volumeInfo.publisher;
    const bookPublishedDate = data.items[0].volumeInfo.publishedDate;
    const bookPageCount = data.items[0].volumeInfo.pageCount;
    const bookAverageRating = data.items[0].volumeInfo.averageRating;
    const bookCategories = data.items[0].volumeInfo.categories;
    const bookLanguage = data.items[0].volumeInfo.language;
    const bookImageLinks = data.items[0].volumeInfo.imageLinks.thumbnail;
    const bookDescription = data.items[0].volumeInfo.description;
    
  
    $('#media-art').html('');
    $('#media-data').html('');
  
    // set actor
    const bookTitleEl = document.createElement('p');
    $(bookTitleEl).attr('class', 'book-results');
    $(bookTitleEl).html('<strong>Title:</strong> ' + bookTitle);
    $('#media-data').append(bookTitleEl);
  
    // set authors
    const bookAuthorsEl = document.createElement('p');
    $(bookAuthorsEl).attr('class', 'book-results');
    $(bookAuthorsEl).html('<strong>Authors:</strong> ' + bookAuthors);
    $('#media-data').append(bookAuthorsEl);
  
    // set publisher
    const bookPublisherEl = document.createElement('p');
    $(bookPublisherEl).attr('class', 'book-results');
    $(bookPublisherEl).html('<strong>Publisher:</strong> ' + bookPublisher);
    $('#media-data').append(bookPublisherEl);
  
    // set published date
    const bookPublishedDateEl = document.createElement('p');
    $(bookPublishedDateEl).attr('class', 'book-results');
    $(bookPublishedDateEl).html('<strong>Published Date:</strong> ' + bookPublishedDate);
    $('#media-data').append(bookPublishedDateEl);
  
    // set page count
    const bookPageCountEl = document.createElement('p');
    $(bookPageCountEl).attr('class', 'book-results');
    $(bookPageCountEl).html('<strong>Page Count:</strong> ' + bookPageCount);
    $('#media-data').append(bookPageCountEl);
  
    // set book average rating
    const bookAverageRatingEl = document.createElement('p');
    $(bookAverageRatingEl).attr('class', 'book-results');
    $(bookAverageRatingEl).html('<strong>Book Rating:</strong> ' + bookAverageRating);
    $('#media-data').append(bookAverageRatingEl);
  
    // set book catergory
    const bookCategoriesEl = document.createElement('p');
    $(bookCategoriesEl).attr('class', 'book-results');
    $(bookCategoriesEl).html('<strong>Catergory:</strong> ' + bookCategories);
    $('#media-data').append(bookCategoriesEl);
  
    // set book language
    const bookLanguageEl = document.createElement('p');
    $(bookLanguageEl).attr('class', 'book-results');
    $(bookLanguageEl).html('<strong>Language:</strong> ' + bookLanguage);
    $('#media-data').append(bookLanguageEl);
    
    // set book synopsis
    const bookDescriptionEl = document.createElement('p');
    $(bookDescriptionEl).attr('class', 'book-results');
    $(bookDescriptionEl).html('<strong>Synopsis:</strong> ' + bookDescription);
    $('#media-data').append(bookDescriptionEl);
  
    // set poster
    $('#media-art').append('<img src="' + bookImageLinks + '" alt="' + bookTitle + '"/>');
  };

// display or hide items on page
var display = function() {
  $('#search-results').removeClass('hide');
  $('#search-history').removeClass('hide');
  $('#clear-history-btn').removeClass('hide');
};

