const books = document.querySelector('.books');
const library = [];
const add = document.querySelector('.add');

const card = (title, author, pages, read) => {
  const newBook = { title, author, pages, read };
  const container = document.createElement('div');
  const items = {
    remove: document.createElement('i'),
    title: document.createElement('h1'),
    author: document.createElement('p'),
    pages: document.createElement('p'),
    read: document.createElement('read'),
  };

  container.classList.add('card');
  items.remove.classList.add('remove');
  items.read.classList.add('btn');

  const isRead = (read) => {
    if (read) {
      items.read.textContent = 'Read';
      items.read.classList.remove('not-read');
      items.read.classList.add('read');
    } else {
      items.read.classList.remove('read');
      items.read.classList.add('not-read');
      items.read.textContent = 'Not Read';
    }
  };

  items.read.addEventListener('click', () => {
    if (items.read.textContent === 'Read') {
      // If the button is being clicked when it already says read,
      // the book now switches to not read, and vice versa
      isRead(false);
    } else isRead(true);
  });

  const fillCard = () => {
    items.title.textContent = newBook.title;
    items.author.textContent = `Author:\n${newBook.author}`;
    items.pages.textContent = `Pages:\n${newBook.pages}`;
    isRead(newBook.read);
    Object.values(items).forEach((item) => container.appendChild(item));

    library.push(newBook);
  };

  return container;
};

const entry = () => {
  const modal = document.querySelector('.hide-modal');
  const overlay = document.querySelector('.modal-overlay');
  const inputs = Array.from(modal.querySelectorAll('input'));
  const submit = modal.querySelector('.btn');

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
      const newCard = card(
        inputs[0].value,
        inputs[1].value,
        inputs[2].value,
        inputs[3].checked
      );
      books.appendChild(newCard);
    }
  };

  add.addEventListener('click', openModal);
  overlay.addEventListener('click', closeModal);
  submit.addEventListener('click', (e) => {
    submitBook(e);
    closeModal();
  });
};

entry();
