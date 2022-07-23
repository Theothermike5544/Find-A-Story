const bookAPIKey = "AIzaSyAWyw1BzmR-6qJOC2A1-G0l_CqKVCN8N4s"
const movieAPIKey = "ec8e125d"
const mediaInputEl = document.getElementById('search-media');

// set up dropdown function for search input
$(document).ready(function(){
    $('select').formSelect();
  });

$('#submit-btn').on('click', function(event) {
    let searchMedia = mediaInputEl.value.trim();

    // get weather unless input left blank
    if (searchMedia) {
      console.log('hello world!');
      //$('#search-media').val('');
    } else {
      alert('Please enter a valid title.');
    }
});