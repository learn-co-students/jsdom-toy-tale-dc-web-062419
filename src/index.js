const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyContainer = document.getElementById('toy-collection')


// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


document.addEventListener("DOMContentLoaded", function(event){
  fetchToys();
  toyForm.addEventListener('submit', createToy)



});// END OF EVENT LISTENER FOR CONTENT LOAD


function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toysArray => {
    toysArray.forEach(createCard) //I'm not entirely sure if I need to put a return keyword in here or not?
    
  })
}//END OF FETCH TOYS GET REQUEST FUNCTION 

function createCard(toyObj){
  
  // Create main card holder element to be appended to toycontainer
  let card = document.createElement('div')
  card.className = "card"
  

  // Create the h2 element to be appened to div
  let cardTitle = document.createElement('h2')
  cardTitle.innerText = toyObj.name

  //Create button
  let btn = document.createElement('button')
  btn.className = 'like-btn'
  btn.innerText = "Like" //I'll prolly have to add an event listener to this button that increments the p tag when clicked
  btn.addEventListener('click', updateLikes)

  //Create p tag
  let pLikes = document.createElement('p')
  pLikes.innerText = toyObj.likes
  pLikes.dataset.id = toyObj.id


  // Create image element of card to be appended 
  let cardImage = document.createElement('img')
  cardImage.className = "toy-avatar"
  cardImage.src = toyObj.image

  //Append created elements to individual toy's card
  card.appendChild(cardTitle)
  card.appendChild(cardImage)
  card.appendChild(btn)
  card.appendChild(pLikes)
  
  // append toy card to main div toy-container
  toyContainer.appendChild(card)


}//END OF CREATE CARD FUNCTION

function createToy(event){
  event.preventDefault()
  //Pull in name and url from the form
  let name = event.target[0].value
  let image = event.target[1].value
  let toyObj = {name: name, image: image, likes: 0 }

  //Create fetch request that will send form data to the server endpoint
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    body: JSON.stringify(toyObj)
  })//END OF FETCH PARAMETERS
  .then(resp => resp.json()) 
  .then(toyObj => {
    createCard(toyObj)
  })




}//END OF CREATE TOY FUNCTION


//This function will trigger when the like button is clicked
function updateLikes(event){
  event.preventDefault()
  let likeCount = parseInt(event.currentTarget.parentElement.childNodes[3].innerText)
  
  let toyId = parseInt(event.target.nextElementSibling.dataset.id)
  // debugger
  event.currentTarget.parentElement.childNodes[3].innerText = parseInt(event.currentTarget.parentElement.childNodes[3].innerText,10) + 1
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    body: JSON.stringify({"likes": (likeCount + 1)})
  })
  
  

}//END OF UPDATE TOY FUNCTION
