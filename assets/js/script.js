// GLOBAL VARIABLES
// API variables
var exchangeApiKey = 'ae50e5610c03661d4029286a';
var exchangeUrl = 'https://v6.exchangerate-api.com/v6/';
var libraryUrl = 'http://openlibrary.org/';

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
  console.log(books);
}
// EVENT LISTENERS
