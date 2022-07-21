var submit = document.getElementById('submit-btn')
var searchValue = document.getElementById('search-song')

//var apiKey = "97d82ea7f7308c579a185e2066658d2a"

var lyricsResults ="http://tracking.musixmatch.com/t1.0/AMa6hJCIEzn1v8RuOP"


//adding event listener for submit btn
submit.addEventListener("submit-btn", searchSong);

function searchSong(){
    document.getElementById('search-song'); 
}

var stringLyrics = JSON.stringify(lyricsResults);
console.log(lyricsResults, stringLyrics);

var displayLyrics = function(){
    var text = "";
    var lyrics = localStorage.getItem(lyricsResults);
    var lyricsArry = JSON.parse(lyrics);
    for (var i=0; i < lyricsArry.length; i++){
        text += lyrics[i] + "<br>";
    };
    document.getElementById('search-results').innerHTML = text;
}

// const music = require('musicmatch')({ apikey: "MY_API KEY" });

// music.trackSearch({ q: "Drake - God's Plan", page: 1, page_size: 3 })
//   .then(function (data) {
//     console.log(data.message.body.track_list);

//   }).catch(function (err) {
//     console.log(err);
//   })