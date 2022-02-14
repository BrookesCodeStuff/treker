var bookContainerEl = document.querySelector('#book-container');

function loadBooks() {
  var books = JSON.parse(window.localStorage.getItem('books'));
  for (var i = 0; i < books.length; i++) {
    // Create a new div element
    var newCard = document.createElement('div');

    // Add the book cover
    var coverImg = document.createElement('img');
    coverImg.src = books[i].cover;

    // Add the title
    var titleEl = document.createElement('p');
    var titleClasses = ['font-bold', 'uppercase', 'my-2'];
    titleEl.id = 'title';
    titleEl.classList.add(...titleClasses);
    titleEl.textContent = books[i].title;

    // Add the author(s)
    var authorEl = document.createElement('p');
    authorEl.id = 'author';
    authorEl.textContent = books[i].author;

    // Append the elements to the card
    newCard.append(coverImg, titleEl, authorEl);
    var cardClasses = [
      'text-white',
      'p-2',
      'w-full',
      'md:w-1/3',
      'lg:1/4',
      'xl:1/4',
    ];
    newCard.classList.add(...cardClasses);
    // Add the card to the book container
    bookContainerEl.append(newCard);
  }
}

loadBooks();
