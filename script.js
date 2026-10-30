let myLibrary = [];
let currentEditBookId = null; 
const mainContainer = document.querySelector("#main");

const newBtn = document.querySelector("#new-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const bookForm = document.querySelector("#form");
const bookDialog = document.querySelector("#my-dialog");

const editBtn = document.querySelector("#edit-btn");
const deleteBtn = document.querySelector("#delete-btn");

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
	addBookToLibrary(new Book("The Old Man and the Sea", "Ernest Hemingway", 140, true));
	addBookToLibrary(new Book("Harry Potter and the Philosopher’s Stone", "J.K. Rowling", 305, true));
	addBookToLibrary(new Book("Lord of the Flies", "William Golding", 240, false));

	displayBook();
}

function displayBook() {
	mainContainer.textContent = "";
  const fragment = document.createDocumentFragment();

	myLibrary.forEach(book => {
    const card = document.createElement("div");
		card.innerHTML =`
			<div class="card" id=${book.id}>
				<div class="book-content">
					<p class="book-title">${book.title}</p>
					<p class="book-author">${book.author}</p>
					<p class="book-page">${book.pages} pages</p>
					<p class="book-read">${book.read ? "Read" : "Not Read"}</p>
				</div>
				<div class="book-buttons">
					<button class="edit-btn" data-id=${book.id}> 
						<img src="assets/icons/pencil.svg" alt="icon" class="icon"> 
					</button>
					<button class="delete-btn" data-id=${book.id}> 
						<img src="assets/icons/trash-can-outline.svg" alt="icon" class="icon"> 
					</button>
				</div>
			</div>`;

    fragment.appendChild(card);
  });
  mainContainer.appendChild(fragment);
}

function getBookFormdata(form) {
	const formData = new FormData(form);

	return new Book(
		formData.get("title"),
		formData.get("author"),
		formData.get("pages"),
		formData.has("read"),
	);
}

newBtn.addEventListener("click", () => {
	currentEditBookId = null;
  bookDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
	currentEditBookId = null;
	document.querySelector("#fieldset").textContent = "Add book";
	document.querySelector("#add-btn").textContent = "Add book";
  bookDialog.close(); 
  bookForm.reset(); 
});

bookForm.addEventListener("submit", (event)=>{
	event.preventDefault();

	const formData = new FormData(bookForm);

	if (currentEditBookId) { 
		const bookToUpdate = myLibrary.find(book => book.id === currentEditBookId);
		
    if (bookToUpdate) {
      bookToUpdate.title = formData.get("title");
      bookToUpdate.author = formData.get("author");
      bookToUpdate.pages = formData.get("pages");
      bookToUpdate.read = formData.has("read");
    }
    currentEditBookId = null; 
	} else {
		const bookUzer = getBookFormdata(bookForm);
		addBookToLibrary(bookUzer);
	}
	displayBook();
	bookDialog.close();
	bookForm.reset(); 
});

mainContainer.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-btn");
  const editButton = event.target.closest(".edit-btn");
  
  if (deleteButton) {
    const idToDelete = deleteButton.dataset.id; 

    myLibrary = myLibrary.filter(book => book.id !== idToDelete);
    displayBook();
  }

  if (editButton) {
    const cardElement = event.target.closest(".card");
		const bookId = cardElement.id;

		const bookToEdit = myLibrary.find(book => book.id === bookId);
		if (bookToEdit) {
			currentEditBookId = bookId;

			document.querySelector("#title").value = bookToEdit.title;
      document.querySelector("#author").value = bookToEdit.author;
      document.querySelector("#pages").value = bookToEdit.pages;
      document.querySelector("#read").checked = bookToEdit.read;

			document.querySelector("#fieldset").textContent = "Edit book";
			document.querySelector("#add-btn").textContent = "Edit book";
				
			bookDialog.showModal();
		}
  }
});

intialize();