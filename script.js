const myLibrary = [];
const main = document.querySelector("#main");

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
	}

	this.id = crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(bookObject) {
  myLibrary.push(bookObject);
}

function intialize() {
	addBookToLibrary(new Book("The Old Man and the Sea", "Ernest Hemingway", 140, "read"));
	addBookToLibrary(new Book("Harry Potter and the Philosopher’s Stone", "J.K. Rowling", 305, "read"));
	addBookToLibrary(new Book("Lord of the Flies", "William Golding", 240, "no-read"));
}
intialize();

function displayBook() {
  const fragment = document.createDocumentFragment();

	myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("card");

		const cardContent = document.createElement("div");
		cardContent.classList.add("card-content");

		const pTitle = document.createElement("p");
		pTitle.classList.add("book-title");
		pTitle.textContent = book.title;

		const pAuthor = document.createElement("p");
		pAuthor.classList.add("book-author");
		pAuthor.textContent = book.author;

		const pPage = document.createElement("p");
		pPage.classList.add("book-page");
		pPage.textContent = `${book.pages} pages`;

		const pRead = document.createElement("p");
		pRead.classList.add("book-read");
		pRead.textContent = book.read;

		cardContent.appendChild(pTitle);
		cardContent.appendChild(pAuthor);
		cardContent.appendChild(pPage);
		cardContent.appendChild(pRead);
		card.appendChild(cardContent)
    fragment.appendChild(card);
  });
  main.appendChild(fragment);
}

displayBook();