const books = document.querySelector('.books');
let library = [];
const add = document.querySelector('.add');

add.addEventListener('click', () => {});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.createCard = function () {
  const card = {};
  const container = document.createElement('div');
  card.edit = document.createElement('i');
  card.title = document.createElement('h1');
  card.author = document.createElement('p');
  card.pages = document.createElement('p');
  card.read = document.createElement('button');

  card.read.addEventListener('click', () => {
    card.read.classList.toggle('read');
    card.read.classList.toggle('not-read');
    if (card.read.classList.contains('read')) {
      card.read.textContent = 'Read';
    } else card.read.textContent = 'Not Read';
  });

  container.classList.add('card');
  card.edit.classList.add('edit');
  card.read.classList.add('btn');
  card.title.textContent = this.title;
  card.author.textContent = `Author: ${this.author}`;
  card.pages.textContent = `Pages: ${this.pages}`;

  if (this.read) {
    card.read.classList.add('read');
    card.read.textContent = 'Read';
  } else {
    card.read.classList.add('not-read');
    card.read.textContent = 'Not Read';
  }

  Object.values(card).forEach((value) => {
    container.appendChild(value);
  });
};
