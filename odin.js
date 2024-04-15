const myLibrary = [];

const button = document.querySelector(".addBook");
const closeButton = document.querySelector(".cancel");
const confirmButton = document.querySelector(".confirm");

const dialog = document.querySelector("dialog");
const body = document.querySelector(".body");


function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
    
Book.prototype.toggle = function(){
    return((this.read == "read") ? "not read" : "read")
};

    const cards = document.querySelector(".cards");
    
function displayBooks(){
    cards.innerHTML = "";
   for(let i=0 ; i < myLibrary.length ; i++){ 
    const card = document.createElement("div");
    card.setAttribute("class","card");
    
    let remove = document.createElement("button");
    remove.setAttribute("class","removeBtn");
    remove.textContent = "Remove";
    remove.setAttribute("data",`${i}`);

    let toggle = document.createElement("button");
    toggle.setAttribute("class","toggleBtn");
    toggle.textContent = "Toggle";
    toggle.setAttribute("data",`${i}`);
    
    
    

    const cardInfos = document.createElement("div");
    cardInfos.innerHTML = `Title: ${myLibrary[i].title} <br>
                            Author: ${myLibrary[i].author} <br>
                             Pages: ${myLibrary[i].pages}<br>
                             reading state: ${myLibrary[i].read}<br>`
    cardInfos.appendChild(remove);
    cardInfos.appendChild(toggle);
    card.appendChild(cardInfos);
    cards.appendChild(card);
    
    remove.addEventListener("click", ()=>{
        myLibrary.splice(Number(remove.getAttribute("data")), 1);
        displayBooks();
    });/* you can put on top it's fine*/
    toggle.addEventListener("click", ()=>{
        myLibrary[i].read = myLibrary[Number(toggle.getAttribute("data"))].toggle();
        displayBooks();
    });

    saveDate()
  } 
}

function addBookTOLibrary(){
    let title = document.querySelector("#title").value
    let author = document.querySelector("#author").value
    let pages = document.querySelector("#pages").value
    let read = document.querySelector("#read").checked ? "read" : "not read";

    let book = new Book(title,author,pages,read);
        return myLibrary.push(book); 
    }

button.addEventListener("click", ()=>{
    dialog.showModal();

})

confirmButton.addEventListener("click", (event)=>{
    event.preventDefault();
    dialog.close();
    addBookTOLibrary();
    displayBooks();
    saveDate()
    title.value = '';
    author.value = '';
    pages.value = '';
    read.value = '';
});

function saveDate(){
    localStorage.setItem('myLibrary', JSON.stringify("myLibrary"));
}

function loadTask(){
    cardInfos.innerHTML = JSON.parse(localStorage.getItem("myLibrary"));
    console.log(Alltasks);
    

}
loadTask()