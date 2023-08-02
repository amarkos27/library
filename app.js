const books = document.querySelector('.books');
const library = [];
const add = document.querySelector('.add');
const modal = document.querySelector('.hide-modal');
const overlay = document.querySelector('.modal-overlay');
const inputs = Array.from(modal.querySelectorAll('input'));
const submit = modal.querySelector('.btn');

const card = () => {
  const container = document.createElement('div');
  const remove = document.createElement('i');
  const title = document.createElement('h1');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const read = document.createElement('button');

  container.classList.add('card');
  remove.classList.add('remove');
  read.classList.add('btn');

  return { container, remove, title, author, pages, read };
};

const book = (title, author, pages, read) => {
  const newBook = { title, author, pages, read };
  const newCard = card();
  const fields = Object.values(newCard).slice(1);

  newCard.remove.addEventListener('click', () => {
    books.removeChild(newCard.container);

    const index = library.indexOf(newBook);
    library.splice(index, 1);
  });

  // Changes the read value on the card and in the stored array
  newCard.read.addEventListener('click', () => {
    const index = library.indexOf(newBook);

    if (newCard.read.textContent === 'Read') {
      newCard.read.classList.remove('read');
      newCard.read.classList.add('not-read');
      newCard.read.textContent = 'Not Read';
      library[index].read = false;
    } else {
      newCard.read.classList.remove('not-read');
      newCard.read.classList.add('read');
      newCard.read.textContent = 'Read';
      library[index].read = true;
    }
  });

  // Initial setting of the fields on the card
  newCard.title.textContent = title;
  newCard.author.textContent = `Author:\n${author}`;
  newCard.pages.textContent = `Pages:\n${pages}`;
  //
  if (read) {
    newCard.read.classList.add('read');
    newCard.read.textContent = 'Read';
  } else {
    newCard.read.classList.add('not-read');
    newCard.read.textContent = 'Not Read';
  }

  fields.forEach((field) => newCard.container.appendChild(field));
  return { newBook, newCard };
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
    const entry = book(
      inputs[0].value,
      inputs[1].value,
      inputs[2].value,
      inputs[3].checked
    );
    library.push(entry.newBook);
    books.appendChild(entry.newCard.container);
    closeModal();
  }
};

add.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);
submit.addEventListener('click', (e) => {
  submitBook(e);
});
