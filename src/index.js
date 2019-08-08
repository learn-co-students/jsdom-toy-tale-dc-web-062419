/* User stories!
1. When the page loads, a user should be able to see Andy's toys

*/

document.addEventListener("DOMContentLoaded", ()=>{
  console.log("hello, is it me you're looking for?")
  addBtn = document.querySelector('#new-toy-btn')
  toyForm = document.querySelector('.container')
  fetchAllToys()
})

/* fetches Andy's toys from the JSON server, a GET request  
invokes callback function to manipulate the response array */
function fetchAllToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toyArray => { 
    toyArray.forEach(renderToys) 
  })
}
  
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

    // renders button 
    let likeButton = document.createElement("button")
    likeButton.classList.add("like-btn")
    likeButton.innerText = "Like <3"
    toyCard.appendChild(likeButton)
}

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


// OR HERE!
