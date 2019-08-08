
document.addEventListener("DOMContentLoaded", function() {
  console.log('Page successfully loaded!')
  // document.getElementById('toy-collection').addEventListener("submit", newToy)
  fetchAllToys()
})

const toyForm = document.querySelector('.container')
const addBtn = document.querySelector('#new-toy-btn')
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

let addToyForm = document.querySelector('.add-toy-form')
addToyForm.addEventListener("submit", newToy)

// 1. When DOM loads, GET fetch, create toy divs
function fetchAllToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json()) // turn into JSON
  .then(toy => {
    toy.forEach(renderToys)
  }) // do something with array
}

// Do something with array from fetch:
function renderToys(toy) { // pass this in
  let toyDiv = document.createElement('div') // create div
  toyDiv.classList.add('card') // give class of 'card'
  document.getElementById('toy-collection').appendChild(toyDiv) // append to toy collection div
  toyDiv.dataset.toyId = `${toy.id}`
  
  // Add Toy Info to the Card
  let toyHeader = document.createElement('h2') // h2
  toyHeader.innerText = toy.name // add inner text (or contents)
  toyDiv.appendChild(toyHeader) // append to toyDiv.card

  // image
  let toyImg = document.createElement('img')
  toyImg.classList.add('toy-avatar')
  toyImg.src = toy.image
  toyDiv.appendChild(toyImg)

  // p
  let toyP = document.createElement('p')
  toyP.innerText = toy.likes + " Likes" // need to interpolate to add "likes"
  toyDiv.appendChild(toyP)

  // button
  let toyButton = document.createElement('button')
  toyButton.classList.add('like-btn')
  toyButton.innerText = "Like"
  toyDiv.appendChild(toyButton)
  toyButton.addEventListener("click", addLikes)
}

// 2. When toyForm submitted, POST fetch, append toy div container
function newToy(event) {
  event.preventDefault()
  
  let data = {
    name: event.target[0].value,
    image: event.target[1].value,
    likes: 0
  }
  console.log(data)

  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(renderToys)
}

// 3. When likeButton clicked, PATCH fetch, update likes
function addLikes(event) {
  let id = event.target.parentElement.dataset.toyId
  let toy = document.querySelector(`div[data-toy-id = '${id}']`)
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": parseInt(toy.children[2].innerText.split(' ')[0]) + 1
    })
  })
  .then(response => response.json())
  .then(renderToys)
}

// Things I Need to Review for Better Understanding:
  // creating user stories
  // review fetch URL
  // how to test for each case, & when (besides console.log)
  // tried to renderToys without forEach
  // forgot how to target event?
  // adding likes was a wild ride