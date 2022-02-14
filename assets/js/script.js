// variables for exchange rate calulator
var currencyEl_one = document.getElementById(`currency-one`);
var currencyEl_two = document.getElementById(`currency-two`);
var amountEl_one = document.getElementById(`amount-one`);
var amountEl_two = document.getElementById(`amount-two`);
var rateEl = document.getElementById(`rate`);
var bookArray = [];

// function for exchange rate calculator
function calculate() {
  var currency_one = currencyEl_one.value;
  var currency_two = currencyEl_two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/7ba4330f269157323b1e1f6f/latest/${currency_one}`
  )
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
var libraryUrl = 'https://openlibrary.org/';
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
  // Clear the bookContainer of any existing data
  bookContainerEl.textContent = '';

  for (var i = 0; i < books.length; i++) {
    // Create a new div element
    var newCard = document.createElement('div');

    // Add the book cover
    var coverImg = document.createElement('img');
    // If the book has a cover in the library, use it
    if (books[i].cover_i) {
      coverImg.src = `https://covers.openlibrary.org/b/id/${books[i].cover_i}-M.jpg`;
    } else {
      // If there is no cover, use the placeholder image
      coverImg.src = './assets/img/no_cover.jpg';
    }

    var titleEl = document.createElement('p');
    var titleClasses = ['font-bold', 'uppercase', 'my-2'];
    titleEl.id = 'title';
    titleEl.classList.add(...titleClasses);
    titleEl.innerHTML = `${books[i].title} <span>(${books[i].publish_year[0]})</span>`;

    var authorEl = document.createElement('p');
    authorEl.id = 'author';
    authorEl.textContent = books[i].author_name.toString().replace(/\,/g, ', ');

    var saveBtnEl = document.createElement('button');
    var btnClasses = [
      'bg-blue-500',
      'my-3',
      'py-2',
      'px-8',
      'rounded-full',
      'text-white',
      'self-center',
    ];
    saveBtnEl.textContent = 'Save Book';
    saveBtnEl.classList.add(...btnClasses);
    saveBtnEl.addEventListener('click', saveBooks);

    newCard.append(coverImg, titleEl, authorEl, saveBtnEl);
    var cardClasses = [
      'text-white',
      'p-2',
      'w-full',
      'md:w-1/3',
      'lg:1/4',
      'xl:1/4',
    ];
    newCard.classList.add(...cardClasses);
    bookContainerEl.append(newCard);
  }

  // Re-enable the search button after guidebooks have loaded
  submitBtnEl.disabled = false;
}

function saveBooks(event) {
  var info = event.target.parentElement.children;
  var bookObj = {};
  for (var i = 0; i < 3; i++) {
    if (info[i].localName === 'img') {
      bookObj.cover = info[i].currentSrc;
    } else {
      var id = info[i].id;
      bookObj[id] = info[i].innerText;
    }
  }
  bookArray.push(bookObj);
  window.localStorage.setItem('books', JSON.stringify(bookArray));
}
function loadSavedBooks() {
  var savedBooks = window.localStorage.getItem('books');

  if (savedBooks == null) {
    return false;
  } else {
    bookArray = JSON.parse(savedBooks);
  }
}

// EVENT LISTENERS
form.addEventListener('submit', () => {
  event.preventDefault();

  // Disable the search button to prevent spam clicking
  submitBtnEl.disabled = true;

  // Send inputs to the search handler
  handleLookup(originEl.value, destinationEl.value);
});

loadSavedBooks();
