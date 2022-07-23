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

$('#submit-btn').on('click', function(event) {
event.preventDefault();
    let searchMedia = mediaInputEl.value.trim();

    // get result unless input left blank
    if (searchMedia) {
      console.log('hello world!');
      //$('#search-media').val('');
    } else {
      alert('Please enter a valid title.');
    }
});