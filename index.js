const myLibrary = [];

function Book(name, author, pages, UUID) {
  // the constructor...
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.UUID = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function(){
    this.read = !this.read;
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310);
addBookToLibrary("1984", "George Orwell", 328);
addBookToLibrary("The Book of Books", "John Doe", 500);

displayBooks();


function addBookToLibrary(name, author, pages) {
  // take params, create a book then store it in the array
    const newBook = new Book(name, author, pages);
    myLibrary.push(newBook);
    console.log(`Added ${newBook.name} by ${newBook.author} to the library...`);
}

function removeBook(uuid){
    const index = myLibrary.findIndex(book => book.UUID = uuid);
    if (index !== -1){ // "if the book was found AKA didn't have an index"
        myLibrary.splice(index, 1);
        displayBooks();
    }
}



function displayBooks() {
    const container = document.getElementById("bookContainer");
    container.innerHTML = "";
  
    for (let book of myLibrary) {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      bookCard.innerHTML = `
        <h2>${book.name}</h2>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.read ? 'Yes' : 'No'}</p>
        <button class="removeBook" data-uuid="${book.UUID}">X</button>
        <button class="toggle-read-btn" data-uuid="${book.UUID}">
        Mark as ${book.read ? 'Not Read' : 'Read'}
        </button>
      `;
  
      container.appendChild(bookCard);
    }
  
    const removeButtons = document.querySelectorAll(".removeBook");
    removeButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const uuidToRemove = e.target.dataset.uuid;
        removeBook(uuidToRemove);
        displayBooks(); 
      });
    });
  
   
    const toggleButtons = document.querySelectorAll(".toggle-read-btn");
    toggleButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const uuid = e.target.dataset.uuid;
        toggleRead(uuid);
        displayBooks(); 
      });
    });
  }
  

  function toggleRead(uuid) {
    const book = myLibrary.find(b => b.UUID === uuid);
    if (book) {
      book.toggleReadStatus();
    }
  }
  

document.getElementById("addBook").addEventListener("click", () => {
    document.getElementById("bookFormDialog").showModal();
});

document.getElementById("closeDialog").addEventListener("click", () => {
    document.getElementById("bookFormDialog").close();
});



document.getElementById("bookForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the page from reloading when submitting a book

    const name = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;

    const newBook = new Book(name, author, pages);
    myLibrary.push(newBook);
    
    displayBooks();
    this.reset();
    document.getElementById("bookFormDialog").close();
});




