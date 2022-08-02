function showListOfBooks() {
    const books = JSON.parse(localStorage.getItem('books'));
    const table = document.getElementById('books_table');

    if (books) {
      let rows = "";
      books.forEach((book, index) => {
        let row = `<tr>`;
        row += `<td>${book.id}</td>`;
        row += `<td>${book.name}</td>`;
        row += `<td>${book.author}</td>`;
        row += `<td> <a href="addBook.html" onclick="editBook(${book.id})" class="link-edit">Edit</a>  |  <a  href="" onclick="deleteBook(${book.id});" class="link-delete">Delete</a>  </td>`;
        rows += row + "</tr>";
      });
      table.innerHTML = rows;
    }

  }
  function deleteBook(bookId) {
    //debugger
    let books = JSON.parse(localStorage.getItem('books'));
    for (var i = 0; i < books.length; i++) {
      if (books[i].id == bookId) {
        books.splice(i, 1);
        alert("Se ha eliminado correctamente");
        break;
       
      }
    }
    
    localStorage.setItem('books', JSON.stringify(books));
  }
  function editBook(bookId) {
    //debugger
    
    loadEditPage();
    let books = JSON.parse(localStorage.getItem('books'));
    for (var i = 0; i < books.length; i++) {
      if (books[i].id == bookId) {
        //b[i].name = 'Closed'; 
        alert("Se ha editado correctamente");
        break;
       
      }
    }
    
    localStorage.setItem('books', JSON.stringify(books));
  }
 
  function addBook(){
    const bookName = $('#title').val();
    const bookAuthor= $('#authors-list option:selected').text();

    //insert to a database
    let booksDb = JSON.parse(localStorage.getItem('books'));
    if(!booksDb) {
      booksDb = [];
    }
    const book = {
      name: bookName,
      id: booksDb.length + 1,
      author: bookAuthor
    }
    booksDb.push(book);
    localStorage.setItem('books', JSON.stringify(booksDb));
    // //reload the book list
    // showListOfBooks();
    console.log(JSON.parse(localStorage.getItem('books')));
    window.location.href = 'books.html';
  }

  function loadAuthors(){
    // read authors from the database
    const authors = JSON.parse(localStorage.getItem('authors'));
    //let select= document.getElementById("authors-list");


    if(authors) {
      let options = "";
      authors.forEach((author) => {
        options += `<option value="${author.id}">${author.name}</option>`;
      })
      // renders the select authors-list with the authors found
      document.getElementById('authors-list').innerHTML = options;
    }
  }

 

  function addAuthor(){
    const bookAuthor= $('#author').val();

  //insert to a database
  let authorsDb = JSON.parse(localStorage.getItem('authors'));
  if(!authorsDb) {
    authorsDb = [];
  }
  const author = {
    name: bookAuthor,
    id: authorsDb.length + 1,
    
  }
  authorsDb.push(author);
  localStorage.setItem('authors', JSON.stringify(authorsDb));
  // //reload the book list
  // showListOfBooks();
  console.log(JSON.parse(localStorage.getItem('authors')));
  window.location.href = 'books.html';
}
function clearInput(){
    document.getElementById('author').value = "";
    alert("A new author was saved sucessfully.")
}
function loadEditPage()
{

  document.getElementById('add-book-button').value="Edit";
  document.getElementById('cover').innerHTML ="Edit book";

}
$('.link-edit').click(function() {
    loadEditPage();
});


