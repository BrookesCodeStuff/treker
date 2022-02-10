// GLOBAL VARIABLES
// API variables
var exchangeApiKey = 'ae50e5610c03661d4029286a';
var exchangeUrl = 'https://v6.exchangerate-api.com/v6/';
var libraryUrl = 'http://openlibrary.org/';
var geocodeApiKey = '0f4c0c1267874aa0a522a0d2e8f4b280';
var geocodeUrl = 'https://api.opencagedata.com/geocode/v1/json?q=';

// Element selector variables
var form = document.querySelector('form');
var originEl = document.querySelector('#origin-country');
var destinationEl = document.querySelector('#destination');
var bookContainerEl = document.querySelector('#book-container');
var submitBtnEl = document.querySelector('#submit');

// FUNCTIONS

function handleLookup(origin, destination) {
  // Code for currency look up goes here

  // Validate the destination
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${destination}&key=${geocodeApiKey}`
  )
    .then((response) => response.json())
    .then((data) =>
      getBooks(
        data.results[0].components.city,
        data.results[0].components.state,
        data.results[0].components.country
      )
    );
}

function getBooks(city, state, country) {
  var destination;
  // Set destination based on returned data
  // Not every search will include a city or state
  // but every search should return a country
  if (city && state) {
    destination = `${city}, ${state}`;
  } else if (city) {
    destination = city;
  } else {
    destination = country;
  }
  fetch(`${libraryUrl}search.json?subject=guidebooks&place=${destination}`)
    .then((response) => response.json())
    .then((data) => {
      var tempArr = [];
      if (data.numFound === 0) {
        var errorMsg = document.createElement('div');
        errorMsg.textContent =
          'Sorry, there were no guidebooks for this destination.';
        bookContainerEl.append(errorMsg);
      } else {
        // Loop through the data for the first 12 books
        for (var i = 0; i < 12; i++) {
          // Add the books to a temporary array
          tempArr.push(data.docs[i]);
        }
        // Send the array to the displayBooks function
        displayBooks(tempArr);
      }
    });
}

function displayBooks(books) {
  for (var i = 0; i < books.length; i++) {
    var newCard = document.createElement('div');
    var coverImg = document.createElement('img');
    if (books[i].cover_i) {
      coverImg.src = `https://covers.openlibrary.org/b/id/${books[i].cover_i}-M.jpg`;
    } else {
      coverImg.src = './assets/img/no_cover.jpg';
    }

    var titleEl = document.createElement('p');
    titleEl.id = "title"
    titleEl.innerHTML = `${books[i].title} <span>(${books[i].publish_year[0]})</span>`;

    var authorEl = document.createElement('p');
    authorEl.id = "author"
    authorEl.textContent = books[i].author_name;

    var saveBtnEl = document.createElement('button');
    saveBtnEl.textContent = 'Save Book';
    saveBtnEl.addEventListener('click', saveBooks )


    newCard.append(coverImg, titleEl, authorEl, saveBtnEl);
    bookContainerEl.append(newCard);
  }
}
function saveBooks(event) {
  var info = event.target.parentElement.children
  var bookArray = []
  for (var i = 0; i < 3; i++) {
    var bookObj = {}
    if (info[i].localName === "img") {
      bookObj.cover = info[i].currentSrc
    } else {
      var id = info[i].id
      bookObj[id] = info[i].innerText
    }
    
    bookArray.push(bookObj)
    window.localStorage.setItem("books",JSON.stringify(bookArray))
    console.log(info)
  }
}
// EVENT LISTENERS
form.addEventListener('submit', () => {
  event.preventDefault();
  submitBtnEl.disabled = true;
  handleLookup(originEl.value, destinationEl.value);
});
