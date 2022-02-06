// GLOBAL VARIABLES
// API variables
var exchangeApiKey = 'ae50e5610c03661d4029286a';
var exchangeUrl = 'https://v6.exchangerate-api.com/v6/';
var libraryUrl = 'http://openlibrary.org/';
var geocodeApiKey = '0f4c0c1267874aa0a522a0d2e8f4b280';
var geocodeUrl = 'https://api.opencagedata.com/geocode/v1/json?q='

// Element selector variables
var form = document.querySelector('form');
var bookContainerEl = document.querySelector('#book-container');

// FUNCTIONS

fetch(`${libraryUrl}search.json?subject=guidebooks&place=paris`)
  .then((response) => response.json())
  .then((data) => {
    var tempArr = [];
    for (var i = 0; i < 12; i++) {
      tempArr.push(data.docs[i]);
    }
    displayBooks(tempArr);
  });

function displayBooks(books) {
  for (var i = 0; i < books.length; i++) {}
}
// EVENT LISTENERS
form.addEventListener('submit', () => {
  event.preventDefault();
  console.log(event);
});
