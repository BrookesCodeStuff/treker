function loadBooks() {
    var books = JSON.parse(window.localStorage.getItem("books"))
    console.log(books)
  } 