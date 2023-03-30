const books = document.querySelector('.books');
let library = [];
const add = document.querySelector('.add');

// overlay.addEventListener('click', () => {
//   overlay.style.zIndex = '0';
//   overlay.style.opacity = '0';
//   newBook.classList.remove('modal');
//   newBook.classList.add('hide-modal');
// });

const createModal = () => {
  const body = document.querySelector('body');
  const libraryNode = document.querySelector('.library');

  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const createInputs = () => {
    let inputs = new Array(3);

    for (let i = 0; i < inputs.length; i++) {
      const input = {};
      const div = document.createElement('div');
      const label = document.createElement('label');
      const field = document.createElement('input');

      if (i < 2) field.setAttribute('type', 'text');
      else field.setAttribute('type', 'number');

      div.appendChild(label);
      div.appendChild(field);

      input.div = div;
      input.label = label;
      input.field = field;

      inputs[i] = input;
    }

    inputs[0].label.textContent = 'Title:';
    inputs[0].label.setAttribute('for', 'title');
    inputs[0].field.setAttribute('id', 'title');

    inputs[1].label.textContent = 'Author:';
    inputs[1].label.setAttribute('for', 'author');
    inputs[1].field.setAttribute('id', 'author');

    inputs[2].label.textContent = 'Pages:';
    inputs[2].label.setAttribute('for', 'pages');
    inputs[2].field.setAttribute('id', 'pages');

    return inputs;
  };

  createInputs();

  const fillModal = () => {
    const form = document.createElement('form');
    const header = document.createElement('h1');
    const inputs = createInputs();
    const button = document.createElement('button');

    header.textContent = 'New Book';
    button.textContent = 'Read';

    form.classList.add('new-item');
    button.classList.add('read', 'btn');

    form.appendChild(header);
    inputs.forEach((input) => {
      form.appendChild(input.div);
    });
    form.appendChild(button);

    modal.appendChild(form);
    overlay.appendChild(modal);
  };

  fillModal();
  body.insertBefore(overlay, libraryNode);
};

const destroyModal = () => document.querySelector('.modal-overlay').remove();

const overlayListener = () => {
  const overlay = document.querySelector('.modal-overlay');
  const modal = document.querySelector('.modal');

  overlay.addEventListener('click', () => {
    modal.classList.remove('modal');
    modal.classList.add('hide-modal');
    setTimeout(destroyModal, 200);
  });
};

add.addEventListener('click', () => {
  createModal();
  overlayListener();
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
