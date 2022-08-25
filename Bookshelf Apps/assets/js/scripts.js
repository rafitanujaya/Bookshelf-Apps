
document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');
    const inputSearchBook = document.getElementById("searchBook");
    const inputBookIsComplete = document.getElementById("inputBookIsComplete");


    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addBook();
    });
    inputBookIsComplete.addEventListener("input", function (event) {
      event.preventDefault();
      checkButton();
    });
    inputBookIsComplete.addEventListener("input", function (event) {
      event.preventDefault();
      checkButtonEdit();
    });
    inputSearchBook.addEventListener("submit", function (event) {
      event.preventDefault();
      searchBook();
    });
    inputSearchBook.addEventListener("keyup", function (event) {
      event.preventDefault();
      searchBook();
    });
    if (isStorageExist()) {
      loadDataFromStorage();
    }
  });

document.addEventListener("ondatasaved", () => {
  console.log("Buku berhasil disimpan.");
  });
  
document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
  });