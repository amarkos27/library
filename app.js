const books = document.querySelector('.books');
const library = [];
const add = document.querySelector('.add');
const overlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.hide-modal');
const submit = document.querySelector('#sub');

const closeModal = (e) => {
  if (
    e.target.classList.contains('modal-overlay')
    || e.target.classList.contains('btn')
  ) {
    modal.classList.add('hide-modal');
    modal.childNodes[1].reset(); // Reset form when modal is closed
    setTimeout(() => {
      overlay.classList.remove('show');
    }, 250);
  }
};

const openModal = () => {
  overlay.classList.add('show');
  modal.classList.remove('hide-modal');
  modal.classList.add('modal');
};

add.addEventListener('click', () => {
  openModal();
});

overlay.addEventListener('click', (e) => {
  closeModal(e);
});

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

const checkValid = (...args) => {
  let valid = true;
  const inputs = [...args];

  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      valid = false;
    } else {
      input.classList.remove('invalid');
    }
  });

  return valid;
};

const validateForm = (...args) => {
  const inputs = [...args];
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      input.classList.add('invalid');
      input.reportValidity();
    }
  });
};

const submitBook = (title, author, pages, read) => {
  const newBook = new Book(title.value, author.value, pages.value, read.checked);
  newBook.createCard();
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const read = document.querySelector('#complete');

  const formValid = checkValid(title, author, pages);
  if (formValid) {
    closeModal(e);
    submitBook(title, author, pages, read);
    modal.childNodes[1].reset();
  } else {
    validateForm(title, author, pages);
  }
});
