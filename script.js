let myLibrary = [];
const main = document.querySelector("#main");

const newBtn = document.querySelector("#new-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const bookForm = document.querySelector("#form");
const bookDialog = document.querySelector("#my-dialog");


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
	addBookToLibrary(new Book("The Old Man and the Sea", "Ernest Hemingway", 140, "Read"));
	addBookToLibrary(new Book("Harry Potter and the Philosopher’s Stone", "J.K. Rowling", 305, "Read"));
	addBookToLibrary(new Book("Lord of the Flies", "William Golding", 240, "Not Read"));

	displayBook();
}

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

function getBookFormdata(form) {
	const formData = new FormData(form);

	return {
		title: formData.get("title"),
		author: formData.get("author"),
		pages: formData.get("pages"),
		read: formData.has("read"),
	};
}

newBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  bookDialog.close(); 
  bookForm.reset(); 
});

bookForm.addEventListener("submit", (event)=>{
	event.preventDefault();
	myLibrary = [];

	const bookUzer = getBookFormdata(bookForm);
	addBookToLibrary(bookUzer);
	displayBook();
	bookDialog.close();
	bookForm.reset(); 
});

intialize();