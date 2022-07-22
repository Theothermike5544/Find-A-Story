const bookAPIKey = "AIzaSyAWyw1BzmR-6qJOC2A1-G0l_CqKVCN8N4s"
const movieAPIKey = "ec8e125d"

var movieInputEl = document.getElementById("movieSearch");
var releaseYear = document.getElementById("releaseYear");
var movieRating = document.getElementById("movieRating");
var boxOffice = document.getElementById("boxOffice");
var smallPlot = document.getElementById("smallPlot");
var director = document.getElementById("director");
var movieTitle = document.getElementById("movieTitle");
var movieImg = document.getElementById("movieImg");
var noPoster = document.getElementById("noPoster");
var movieHistory1 = document.getElementById("movieSearchHistory1");
var movieHistory2 = document.getElementById("movieSearchHistory2");


var bookInputEl = document.getElementById("bookSearch");
var bookPublisher = document.getElementById("publisher");
var bookPubDate = document.getElementById("pubDate");
var pageCount = document.getElementById("pageCount");
var bookTitle = document.getElementById("bookTitle");
var author = document.getElementById("author");
var bookPlot = document.getElementById("smallSum");
var bookImg = document.getElementById("bookImg");
var noCover = document.getElementById("noCover");
var bookHistory1 = document.getElementById("bookSearchHistory1");
var bookHistory2 = document.getElementById("bookSearchHistory2");

//disable enter key
$(document).keypress(
    function (event) {
        if (event.which == '13') {
            event.preventDefault();
        }
    });



//modal initialization
$(document).ready(function(){
    $('.modal').modal();
  });


//function to get info from the book api
var getBookData = function(book) {
    
    var bookUrl = "https://www.googleapis.com/books/v1/volumes" + "?q=" + book + "&api-key=" + bookAPIKey;

    fetch(bookUrl)
    .then(function(response) {
        //if response was successful
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data.items[0].volumeInfo);
                if(data.items == "False") {
                    $('#modal2').modal("open");
                } else {
                bookInputEl.value = ''
                bookTitle.innerHTML = checkData(data.items[0].volumeInfo.title, 'book');
                bookPublisher.innerHTML = checkData(data.items[0].volumeInfo.publisher, 'book');
                bookPubDate.innerHTML = checkData(data.items[0].volumeInfo.publishedDate, 'book');
                pageCount.innerHTML = checkData(data.items[0].volumeInfo.pageCount, 'book') + " pages";
                bookPlot.innerHTML = checkData(data.items[0].volumeInfo.description, 'book');
                author.innerHTML = checkData(data.items[0].volumeInfo.authors[0], 'book');
                bookImg.src = checkData(data.items[0].volumeInfo.imageLinks.thumbnail, 'book');


                }
            });
        } else {
            $('#modal2').modal("open");
        }
      })
      .catch(function(error) {
          alert('Unable to connect to book api');
      });
    }

    //function to get info from the movie api
var getMovieData = function(movie) {
   
    var movieUrl = "https://www.omdbapi.com/?apikey=" + movieAPIKey + "&t=" + movie + "&r=json";

    fetch(movieUrl)
    .then(function(response) {
        //if response was successful
        if (response.ok) {
            //console.log(response);
            response.json().then(function(title) {
                console.log(title.Response);
                if(title.Response == "False") {
                    $('#modal1').modal("open");
                } else {
                movieInputEl.value = ''
                movieTitle.innerHTML = checkData(title.Title, 'movie');
                releaseYear.innerHTML = checkData(title.Released, 'movie');
                boxOffice.innerHTML = checkData(title.BoxOffice, 'movie');
                smallPlot.innerHTML = checkData(title.Plot, 'movie');
                movieRating.innerHTML = checkData(title.Rated, 'movie');
                director.innerHTML = checkData(title.Director, 'movie');
                movieImg.src = checkData(title.Poster, 'movie');
                }
            
            });
            
        } else {
            alert("Please input a valid movie");
        }
      })
      .catch(function(error) {
          alert('Unable to connect to movie');
      });
    }

//retrieving the book title and sending it to the html
var getBookTitle = function() {

    //getting a value from the input element
    var title = bookInputEl.value.trim();

    if (title) {
        getBookData(title);
        
    } else {
        $('#modal2').modal("open");
    }
}




//retrieving the movie title and sending it to the html
var getMovieTitle = function() {

    //getting a value from the input element
    var title = movieInputEl.value.trim();

    if (title) {
        getMovieData(title);
        
    } else {
        $('#modal1').modal("open");
    }
}

//search button for movie
var searchMovieBtn = document.getElementById("titleInput")
searchMovieBtn.addEventListener("click", function() {
    var movieInputEl = document.getElementById("movieSearch")
    var movieElement = {
        movieName: movieInputEl.value
    };
    saveMovie(movieElement);
    getMovieTitle();
    
})

//search button for book
var searchBookBtn = document.getElementById("bookTitleInput")
searchBookBtn.addEventListener("click", function() {
    var bookInputEl = document.getElementById("bookSearch")
    var bookElement = {
        bookName: bookInputEl.value
    };
    saveBook(bookElement);
    getBookTitle();
  
})

//saving the movie searches in local storage
var saveMovie = function(movieElement) {

    var myMovieData;

    if (localStorage.getItem("movieData") == null) {
        var newArray = [];
        newArray.push(movieElement);
        myMovieData = newArray;
        localStorage.setItem("movieData", JSON.stringify(newArray));
    } else {
        //array already exists in storage
        var currentMovieData = JSON.parse(localStorage.getItem("movieData"))
        var movieExists = false;

        for( i = 0; i < currentMovieData.length; i++) {
            if (currentMovieData[i].movieName == movieElement.movieName) {
                movieExists = true;
            }
        }
        if (!movieExists) {
            currentMovieData.push(movieElement);
            localStorage.setItem("movieData", JSON.stringify(currentMovieData));
        }
        myMovieData = currentMovieData;
    }
    if(myMovieData.length < 2){
        movieHistory1.innerHTML = myMovieData[myMovieData.length - 1].movieName;
    } else {
        movieHistory1.innerHTML = myMovieData[myMovieData.length - 1].movieName;
        movieHistory2.innerHTML = myMovieData[myMovieData.length - 2].movieName;
    }
};

//saving the book searches in local storage
var saveBook = function(bookElement) {

    var myBookData;

    if (localStorage.getItem("bookData") == null) {
        var newArray = [];
        newArray.push(bookElement);
        myBookData = newArray;
        localStorage.setItem("bookData", JSON.stringify(newArray));
    } else {
        //array already exists in storage
        var currentBookData = JSON.parse(localStorage.getItem("bookData"))
        var bookExists = false;

        for( i = 0; i < currentBookData.length; i++) {
            if (currentBookData[i].bookName == bookElement.bookName) {
                bookExists = true;
            }
        }
        if (!bookExists) {
            currentBookData.push(bookElement);
            localStorage.setItem("bookData", JSON.stringify(currentBookData));
        }
        myBookData = currentBookData;
    }
    if(myBookData.length < 2){
        bookHistory1.innerHTML = myBookData[myBookData.length - 1].bookName;
    } else {
        bookHistory1.innerHTML = myBookData[myBookData.length - 1].bookName;
        bookHistory2.innerHTML = myBookData[myBookData.length - 2].bookName;
    }
   
};





//clear button for book data
var clearBookBtn = document.getElementById("clearCurrentBook");
clearBookBtn.addEventListener("click", function() {
    bookTitle.innerHTML = ''
    bookPublisher.innerHTML = ''
    bookPubDate.innerHTML = ''
    pageCount.innerHTML = ''
    bookPlot.innerHTML = ''
    author.innerHTML = ''
    bookImg.src = ''
    bookImg.style.display="none";
    
})


//clear button for movie data
var clearMovieBtn = document.getElementById("clearCurrent");
  clearMovieBtn.addEventListener("click", function() {
    movieTitle.innerHTML = ''
    releaseYear.innerHTML = ''
    boxOffice.innerHTML = ''
    smallPlot.innerHTML = ''
    movieRating.innerHTML = ''
    director.innerHTML = ''
    movieImg.src = ''
    movieImg.style.display="none";

  })

//checking if data is available from API
var checkData = function(result, checkType) {

    if(checkType == 'book'){
        if (result == null) {
            return "N/A"
        } else if (result == "N/A") {
            noCover.style.display="block";
            bookImg.style.display="none";
            return result;
        } else {
            noCover.style.display="none";
            bookImg.style.display="block";
            return result;
        }
    } else {
        if (result == null) {
            return "N/A"
        } else if (result == "N/A") {
            noPoster.style.display="block";
            movieImg.style.display="none";
            return result;
        } else {
            noPoster.style.display="none";
            movieImg.style.display="block";
            return result;

        }
    }


}
//clearing local storage on button click
var clearBookStorage = document.getElementById("clearBookStorage");
clearBookStorage.addEventListener("click", function() {
    window.localStorage.removeItem('bookData')
    bookHistory1.innerHTML = ''
    bookHistory2.innerHTML = ''
    
})


//clear movie local storage on button click
var clearMovieStorage = document.getElementById("clearMovieStorage");
clearMovieStorage.addEventListener("click", function() {
    window.localStorage.removeItem('movieData')
    movieHistory1.innerHTML = ''
    movieHistory2.innerHTML = ''
})