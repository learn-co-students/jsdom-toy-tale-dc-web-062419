/* User stories! 
1. When the page loads, a user should GET and see Andy's toys
*/

document.addEventListener("DOMContentLoaded", ()=>{
  console.log("hello, is it me you're looking for?")
  
  // checking for form's existence below: 
  /* console.log("this is the form element :", 
  document.querySelector("form")) */
  
  document.querySelector("form").addEventListener("submit", submitHandler)
  
  let addToy = false
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  
  fetchAllToys()
})

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')

// fetch Andy's toys from the JSON server, a GET request  
// invokes callback function that renders the response array to the DOM
function fetchAllToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toyArray => { 
    toyArray.forEach(renderToys) 
  })
}

//renders toy data to the DOM
function renderToys(toy) {
  // renders card
  let toyCard = document.createElement("div")
  toyCard.classList.add("card")
  
  document.querySelector('#toy-collection').appendChild(toyCard)
  
  // renders header
  let cardHeader = document.createElement("h2")
  toyCard.appendChild(cardHeader)
  cardHeader.innerText = toy.name
  
  // renders image
  let toyImg = document.createElement("img")
  toyImg.classList.add("toy-avatar")
  toyCard.appendChild(toyImg)
  toyImg.src = toy.image
  
  // renders pTag
  let pTag = document.createElement("p")
  toyCard.appendChild(pTag)
  pTag.innerText = `${toy.likes} likes`
  
  // renders likeButton 
  let likeButton = document.createElement("button")
  likeButton.classList.add("like-btn")
  likeButton.innerText = "Like <3"
  toyCard.appendChild(likeButton)
  likeButton.addEventListener("click", increaseLikes)
  
  toyCard.id = `toy-${toy.id}`
  pTag.id = `toy-${toy.id}-likes`
}

// callback function when user submits new toy form
// 2. A user should be able to POST a new toy to the collection! 

function submitHandler(event) {
  event.preventDefault()
  
  let newToyInfo = {
    name: event.target[0].value,
    image: event.target[1].value,
    likes: 0
  }
  
  let configObject = {
    method: "POST",
    headers: {'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify(newToyInfo)
} 

// fetch, but make it POST, you know?
fetch('http://localhost:3000/toys', configObject)
.then(res => res.json())
.then(renderToys)  

// clears form input box after submit
event.target[0].value = ''
event.target[1].value = ''
}

// 3. A user should be able to like a toy, see the like count go up, and persist to the database 
// callback function to handle a user's click of the <3 like button 
function increaseLikes(event) {
  let toyLikes = event.target.parentNode.children[2].innerText
  let toyLikeCount = parseInt(toyLikes.substring(0, toyLikes.indexOf(" ")))
  let toyId = event.target.parentNode.id.split("-")[1]
  

  let newLikeData = {
    likes: toyLikeCount + 1
  }

  let patchObject = {
    method: "PATCH", 
    headers: {"Content-Type": "application/json",
    Accept: "application/json"
    },
    body: JSON.stringify(newLikeData)
  }

  // fetch, but make it PATCH
  fetch(`http://localhost:3000/toys/${toyId}`, patchObject)
  .then(resp => resp.json())
  .then(toy => document.getElementById(`toy-${toyId}-likes`).innerText = `${toy.likes} likes`)
}
 