var bookContainerEl = document.querySelector("#book-container")
function loadBooks() {
    var books = JSON.parse(window.localStorage.getItem("books"))
    console.log(books)
    for (var i = 0; i < books.length; i++){
      console.log(books[i])
       // Create a new div element
    var newCard = document.createElement('div');

    // Add the book cover
    var coverImg = document.createElement('img');
    // If the book has a cover in the library, use it
   
      coverImg.src = books[i].cover
  

    var titleEl = document.createElement('p');
    var titleClasses = ['font-bold', 'uppercase', 'my-2'];
    titleEl.id = 'title';
    titleEl.classList.add(...titleClasses);
    titleEl.textContent = books[i].title;

    var authorEl = document.createElement('p');
    authorEl.id = 'author';
    authorEl.textContent = books[i].author;

    // var saveBtnEl = document.createElement('button');
    // var btnClasses = [
    //   'bg-blue-500',
    //   'my-3',
    //   'py-2',
    //   'px-8',
    //   'rounded-full',
    //   'text-white',
    //   'self-center',
    // ];
    // saveBtnEl.textContent = 'Save Book';
    // saveBtnEl.classList.add(...btnClasses);
    // saveBtnEl.addEventListener('click', saveBooks);

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
    bookContainerEl.append(newCard);
  }
  }
  loadBooks()