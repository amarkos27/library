const add = document.querySelector('.add');
const modal = document.querySelector('.hide-modal');
const overlay = document.querySelector('.modal-overlay');
const inputs = Array.from(modal.querySelectorAll('input'));
const submit = modal.querySelector('.btn');

const Library = (() => {
  const books = document.querySelector('.books');
  const library = [];

  const append = (container, entry) => {
    books.appendChild(container);
    library.push(entry.newBook);
  };

  const remove = (container, entry) => {
    books.removeChild(container);
    library.splice(library.indexOf(entry), 1);
  };

  return { append, remove };
})();
class Card {
  #container = document.createElement('div');

  #removeButton = document.createElement('i');

  #title = document.createElement('h1');

  #author = document.createElement('p');

  #pages = document.createElement('p');

  #wasRead = document.createElement('button');

  #input;

  #addInitialStyles() {
    this.#container.classList.add('card');
    this.#removeButton.classList.add('remove');
    this.#wasRead.classList.add('btn');
  }

  #getPieces() {
    return [
      this.#removeButton,
      this.#title,
      this.#author,
      this.#pages,
      this.#wasRead,
    ];
  }

  #setUpReadBtn() {
    let className;
    let text;

    this.#wasRead.classList = 'btn';

    if (this.#input.wasRead) {
      className = 'read';
      text = 'Read';
    } else {
      className = 'not-read';
      text = 'Not Read';
    }

    this.#wasRead.classList.add(className);
    this.#wasRead.textContent = text;
  }

  #setUpListeners() {
    this.#removeButton.addEventListener('click', () => {
      Library.remove(this.#container, this.#input);
    });

    this.#wasRead.addEventListener('click', () => {
      this.#input.wasRead = !this.#input.wasRead;
      this.#setUpReadBtn();
    });
  }

  constructCard() {
    this.#addInitialStyles();

    const pieces = this.#getPieces();

    const { title, author, pages } = this.#input;
    this.#title.textContent = title;
    this.#author.textContent = `Author:\n${author}`;
    this.#pages.textContent = `Pages:\n${pages}`;

    this.#setUpReadBtn();
    this.#setUpListeners();

    pieces.forEach((piece) => this.#container.appendChild(piece));
  }

  submit(newBook) {
    Library.append(this.#container, newBook);
  }

  constructor(entry) {
    this.#input = entry;
  }
}

const newEntry = (title, author, pages, wasRead) => {
  const newBook = { title, author, pages, wasRead };
  const newCard = new Card(newBook);
  newCard.constructCard();

  const submit = () => {
    newCard.submit(newBook);
  };

  return { newBook, newCard, submit };
};

// Modal interaction
modal.addEventListener('click', (e) => {
  e.stopPropagation();
});

const resetForm = () => {
  const form = modal.querySelector('form');
  form.reset();
};

const openModal = () => {
  overlay.classList.add('show');
  modal.classList.remove('hide-modal');
  modal.classList.add('modal');
};

const closeModal = () => {
  modal.classList.add('hide-modal');
  inputs.forEach((input) => input.classList.remove('invalid'));
  resetForm();
  setTimeout(() => {
    overlay.classList.remove('show');
  }, 250);
};

const submitBook = (e) => {
  e.preventDefault();
  let valid = true;

  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      input.classList.add('invalid');
      input.reportValidity();
      valid = false;
    }
  });

  if (valid) {
    const entry = newEntry(
      inputs[0].value,
      inputs[1].value,
      inputs[2].value,
      inputs[3].checked
    );
    entry.submit();
    closeModal();
  }
};

add.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);
submit.addEventListener('click', (e) => {
  submitBook(e);
});
