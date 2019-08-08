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
    let toyDiv = document.createElement("div")
    toyDiv.classList.add("card")
    document.querySelector('#toy-collection').appendChild(toyDiv)
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
