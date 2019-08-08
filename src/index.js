
document.addEventListener("DOMContentLoaded", function() {
  console.log('Page successfully loaded!')
  fetchAllToys()
})

const toyForm = document.querySelector('.container')
const addBtn = document.querySelector('#new-toy-btn')
let addToy = false

// 1. When DOM loads, GET fetch, create toy divs
function fetchAllToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json()) // turn into JSON
  .then(toys => {
    toys.forEach(renderToys)
  }) // do something with array
}

// Do something with array from fetch:
function renderToys(toys) { // pass this in
  let toyDiv = document.createElement('div') // create div
  toyDiv.classList.add('card') // give class of 'card'
  document.getElementById('toy-collection').appendChild(toyDiv) // append to toy collection div
  
  // Add Toy Info to the Card
  let toyHeader = document.createElement('h2') // h2
}

// 2. When toyForm submitted, POST fetch, append toy div container
// 3. When likeButton clicked, PATCH fetch, update likes

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

// Things I Need to Review for Better Understanding:
  // creating user stories
  // review fetch URL
  // how to test for each case, & when (besides console.log)
  // tried to renderToys without forEach