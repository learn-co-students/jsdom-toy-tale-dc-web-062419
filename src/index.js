const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyBin = document.querySelector('#toy-collection')

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

document.addEventListener("DOMContentLoaded", function(){
  renderToys()

 toyForm.addEventListener("submit", handleSubmit )



})

// OR HERE!

function handleSubmit(e) {
  e.preventDefault()
  let toyName = document.querySelector('input#toy-name')
  let toyImage = document.querySelector('input#toy-image')

  configToy = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name: toyName.value, image: toyImage.value, likes: 0})
  }
  fetch('http://localhost:3000/toys', configToy).then(resp => resp.json()).then(toy => display(toy))

  toyName.value = ''
  toyImage.value = ''
  toyForm.style.display = 'none'
}



function renderToys() {
  fetch('http://localhost:3000/toys').then(resp => resp.json()).then(data => data.forEach( (toy) => display(toy) ))
}

function display(toy) {

  toyDiv = document.createElement('div')
  toyDiv.className = "card"
  toyDiv.id = `toy-${toy.id}`
  toyBin.appendChild(toyDiv)

  h2 = document.createElement('h2')
  h2.innerText = toy.name
  toyDiv.appendChild(h2)

  toyImg = document.createElement('img')
  toyImg.className = "toy-avatar"
  toyImg.src = toy.image
  toyDiv.appendChild(toyImg)

  toyP = document.createElement('p')
  toyP.innerText = `${toy.likes} Likes`
  toyDiv.appendChild(toyP)

  likebtn = document.createElement("button")
  likebtn.className = "like-btn"
  likebtn.innerText = "Like"
  toyDiv.appendChild(likebtn)

  likebtn.addEventListener('click', likeToy)
  
}

function likeToy(e) {
  console.log("reached like")
  debugger
let id = e.target.parentElement.id.split("-")[1]
debugger 
configToy = {
  method: 'PATCH',
  headers: {
    "Content-Type": 'application/json',
    "Accept": "application/json"
  },
  body: JSON.stringify({likes: parseInt(event.target.parentElement.children[2].innerText.split(" ")[0]) + 1})
}
  fetch(`http://localhost:3000/toys/${id}`, configToy).then(resp => resp.json()).then(updatedToy => {
    document.querySelector(`#toy-${id}`).children[2].innerText = `${updatedToy.likes} Likes`
  }
  )}
