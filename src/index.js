const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let url = 'http://localhost:3000/toys'

// YOUR CODE HERE
getAllToys()
function getAllToys(){
  fetch(url)
  .then(res => res.json())
  .then(res => {
    res.forEach(renderToys)
  })
}

function renderToys(toy){
  // debugger
  
    let toycollectionDiv = document.getElementById('toy-collection')
      let newToyDiv = document.createElement('div')
      newToyDiv.classList = 'card'
      toycollectionDiv.appendChild(newToyDiv)
      let newToyName = document.createElement('h2')
      newToyDiv.appendChild(newToyName)
      newToyName.innerText = toy.name
      let newToyImg = document.createElement('img')
      newToyDiv.appendChild(newToyImg)
      newToyImg.src = `${toy.image}`
      newToyImg.classList = "toy-avatar"
      let likes = document.createElement('p')
      newToyDiv.id = toy.id
      likes.innerText = `${toy.likes} Likes`
      newToyDiv.appendChild(likes)
      let button = document.createElement('button')
      button.classList = 'like-btn'
      button.innerText = "Likes <3<3<3<3<3<3<3<3"
      button.addEventListener('click', addLike)
      newToyDiv.appendChild(button)
}

let form = document.querySelector('.add-toy-form')

  form.addEventListener('submit', newToyForm)

function newToyForm(event){

  event.preventDefault()

  let data = {
    "name": event.target['name'].value,
    "image": event.target['image'].value,
    "likes": '0'
  }
  // debugger
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: { "Content-Type": "application/json", 
              "Accept": "application/json"
     },
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then( res => renderToys(res))
}




function addLike(){
  event.preventDefault()
  let id = event.target.parentElement.id
  let likeNumber = parseInt(event.target.parentElement.querySelector('p').innerText.split(" ")[0])
 
  // let likes = 
  let data = {
    "likes": (likeNumber + 1)
  }
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", 
              "Accept": "application/json"
     },
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then( res => updateLikeCount(res))
}



function updateLikeCount(res){
  let toyDiv = document.getElementById(res.id)
  toyDiv.children[2].innerText = `${res.likes} Likes`
}




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