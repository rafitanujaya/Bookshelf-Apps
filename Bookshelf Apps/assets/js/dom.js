const UNCOMPLETED_READ = "incompleteBookshelfList";
const COMPLETED_READ = "completeBookshelfList";
const BOOK_ITEMID = "itemId";


  function addBook() {
    const incompleteBookshelfList = document.getElementById(UNCOMPLETED_READ);
    const completedBookShelflist = document.getElementById(COMPLETED_READ);
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    const isCompleted = document.getElementById('inputBookIsComplete').checked;

    const book = makeBook (bookTitle, bookAuthor, bookYear, isCompleted);
    const bookObject = generateBookObject(bookTitle, bookAuthor, bookYear, isCompleted);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject)

    if (isCompleted) {
      completedBookShelflist.append(book);
    } else {
      incompleteBookshelfList.append(book);
    }
    updateDataToStorage()
  }

  function generateBookObject(title, author, year, isComplete) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete
    };
}

function makeBook(title, author, year, isComplete) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = author;

  const bookYear = document.createElement("p");
  bookYear.innerText = year;

  const bookAction = document.createElement("div");
  bookAction.classList.add("action");
  if (isComplete) {
      bookAction.append(
          createEditButton(),
          createUndoButton(),
          createTrashButton(),
      );
  } else {
      bookAction.append(
          createEditButton(),
          createCheckButton(),
          createTrashButton(),
      );
  }

  const container = document.createElement("article");
  container.classList.add("book_item");
  container.append(bookTitle, bookAuthor, bookYear, bookAction);

  return container;
}

function createButton(buttonTypeClass, buttonText, eventListener) {
  const button = document.createElement("button");
  button.innerText = buttonText;
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
      eventListener(event);
  });

  return button;
} 

function createUndoButton() {
  return createButton("green", "Belum selesai dibaca", function (event) {
      undoBook(event.target.parentElement.parentElement);
  });
}

function createTrashButton() {
  return createButton("red", "Hapus buku", function (event) {
      removeBook(event.target.parentElement.parentElement);
  });
}

function createEditButton() {
    return createButton("green", "Edit buku", function(event) {
        editBook(event.target.parentElement.parentElement);
    });
}

function createCheckButton() {
  return createButton("green", "Selesai dibaca", function (event) {
      addBookToCompleted(event.target.parentElement.parentElement);
  });
}


function addBookToCompleted(bookElement) {
  const completeBookshelfList = document.getElementById(COMPLETED_READ);
  const bookTitle = bookElement.querySelector("h3").innerText;
  const bookAuthor = bookElement.querySelectorAll("p")[0].innerText;
  const bookYear = bookElement.querySelectorAll("p")[1].innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isComplete = true;
  newBook[BOOK_ITEMID] = book.id;

  completeBookshelfList.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function removeBook(bookElement) {
  const isDelete = window.confirm("Apakah yakin ingin menghapus buku ini?");
  if (isDelete) {
      const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
      books.splice(bookPosition, 1);

      bookElement.remove();
      updateDataToStorage();
      alert("Buku berhasil dihapus");
  } else {
      alert("Buku gagal dihapus");
  }
}

function undoBook(bookElement) {
  const incompleteBookshelfList = document.getElementById(UNCOMPLETED_READ);
  const bookTitle = bookElement.querySelector("h3").innerText;
  const bookAuthor = bookElement.querySelectorAll("p")[0].innerText;
  const bookYear = bookElement.querySelectorAll("p")[1].innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isComplete = false;
  newBook[BOOK_ITEMID] = book.id;

  incompleteBookshelfList.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function editBook(bookElement) {
    document.getElementById("bookSubmit").style.display = "none";
    const editButton = document.getElementById("editeBook");
    editButton.style.display = "block";
    document.getElementById("inputBookTitle").value = bookElement.querySelector("h3").innerText;
    document.getElementById("inputBookAuthor").value = bookElement.querySelectorAll("p")[0].innerText;
    document.getElementById("inputBookYear").value = bookElement.querySelectorAll("p")[1].innerText;

    editButton.addEventListener("click", function(event) {
        event.preventDefault();
        createEditBook(bookElement);
    });
}

function backButton() {
    document.getElementById("bookSubmit").style.display = "block";
    document.getElementById("editeBook").style.display = "none";
}

function createEditBook(bookElement) {
    bookElement.remove();
    const UNCOMPLETED = document.getElementById(UNCOMPLETED_READ);
    const COMPLETED = document.getElementById(COMPLETED_READ);
    const checkType = document.getElementById("inputBookIsComplete");

    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    if (!checkType.checked) {
        const book = makeBook(title, author, year, false);
        const bookObject = generateBookObject(title, author, year, false);
        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
        UNCOMPLETED.append(book);
    } else {
        const book = makeBook(title, author, year, true);
        const bookObject = generateBookObject(title, author, year, true);
        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
        COMPLETED.append(book);
    }
    updateDataToStorage();
    backButton();
    hapusForm(bookElement);
}

function hapusForm(bookElement) {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
}

const inputBookIsComplete = document.getElementById('inputBookIsComplete');

function checkButton() {
  const span = document.querySelector(".done");
  if (inputBookIsComplete.checked) {
      span.innerText = "Selesai dibaca";
  } else {
      span.innerText = "Belum selesai dibaca";
  }
}

function checkButtonEdit() {
    const span = document.querySelector(".doneEdit");
    if (inputBookIsComplete.checked) {
        span.innerText = "Selesai dibaca";
    } else {
        span.innerText = "Belum selesai dibaca";
    }
  }

function searchBook() {
  const searchBook = document.getElementById("searchBookTitle");
  const filter = searchBook.value.toUpperCase();
  const bookItem = document.querySelectorAll("section.book_shelf > .book_list > .book_item");
  for (let i = 0; i < bookItem.length; i++) {
      const txtValue = bookItem[i].textContent || bookItem[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          bookItem[i].style.display = "";
      } else {
          bookItem[i].style.display = "none";
      }
  }
} 