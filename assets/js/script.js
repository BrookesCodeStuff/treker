// variables for exchange rate calulator
var currencyEl_one = document.getElementById(`currency-one`);
var currencyEl_two = document.getElementById(`currency-two`);
var amountEl_one = document.getElementById(`amount-one`);
var amountEl_two = document.getElementById(`amount-two`);
var rateEl = document.getElementById(`rate`);

// function for exchange rate calculator
function calculate() {
    var currency_one = currencyEl_one.value;
    var currency_two = currencyEl_two.value;

    fetch(`https://v6.exchangerate-api.com/v6/7ba4330f269157323b1e1f6f/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
    
      var rate = data.conversion_rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}


// click listeners for exchange rate calculator
currencyEl_one.addEventListener(`change`, calculate);
currencyEl_two.addEventListener(`change`, calculate);
amountEl_one.addEventListener(`input`, calculate);
amountEl_two.addEventListener(`input`, calculate);


calculate();

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
      // Loop through the data for the first 12 books
      for (var i = 0; i < 12; i++) {
        // Add the books to a temporary array
        tempArr.push(data.docs[i]);
      }
      // Send the array to the displayBooks function
      displayBooks(tempArr);
    });
}

function displayBooks(books) {
  for (var i = 0; i < books.length; i++) {
    var newCard = document.createElement('div');
    console.log(books[i].cover_i);
    var coverImg = document.createElement('img');
    if (books[i].cover_i) {
      coverImg.src = `https://covers.openlibrary.org/b/id/${books[i].cover_i}-M.jpg`;
    } else {
      console.log('not found');
      coverImg.src = './assets/img/no_cover.jpg';
    }

    var titleEl = document.createElement('p');
    titleEl.innerHTML = `${books[i].title} <span>(${books[i].publish_year[0]})</span>`;

    var authorEl = document.createElement('p');
    authorEl.textContent = books[i].author_name;

    var saveBtnEl = document.createElement('button');
    saveBtnEl.textContent = 'Save Book';

    newCard.append(coverImg, titleEl, authorEl, saveBtnEl);
    bookContainerEl.append(newCard);
  }
}
// EVENT LISTENERS
form.addEventListener('submit', () => {
  event.preventDefault();
  handleLookup(originEl.value, destinationEl.value);
});
