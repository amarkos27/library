const screen = document.querySelector('ul');
let library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  const book = document.createElement('li');
  book.textContent = `Title: ${this.title}\nAuthor: ${this.author}\nNumber of pages: ${this.pages}\nRead: ${this.read}`;
  screen.appendChild(book);
};

function addBookToLibrary() {}

const example = new Book('Percy Jackson', 'Rick Riordan', 300, 'Yes');
example.info();
