const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

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

document.addEventListener("DOMContentLoaded", showToys)

function showToys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  // .then(data => console.log(data))
  .then(data => data.forEach(renderToy))
}

function renderToy(toy) {
  toyBox = document.getElementById("toy-collection")
  toyDiv = document.createElement("div")
  toyPic = document.createElement("img")
  toyNameP = document.createElement("h2")
  toyLikesP = document.createElement("p")
  toyButton = document.createElement("button")
  toyNameP.innerText = toy.name
  toyLikesP.innerText = `${toy.likes} Likes`
  toyPic.src = toy.image
  toyDiv.id = `toy-${toy.id}`
  toyButton.innerText = "Likes"
  toyPic.classList.add("toy-avatar")
  toyDiv.classList.add("card")
  toyBox.prepend(toyDiv)
  toyDiv.append(toyNameP)
  toyDiv.append(toyPic)
  toyDiv.append(toyLikesP)
  toyDiv.append(toyButton)
  toyButton.addEventListener("click", increaseLikes)
  console.log(toy)
}

function increaseLikes() {
  divId = event.currentTarget.parentNode.id
  div = document.getElementById(divId)
  toyId = divId.split("-")[1] 
  likesP = document.querySelector(`#${divId} p`)
  oldLikesT = parseInt(likesP.innerText.split(' ')[0])
  newLikesT = oldLikesT + 1

  
  url=`http://localhost:3000/toys/${toyId}`
  data = {likes: newLikesT}
  fetch(url, {
    method: "PATCH",
    headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
             },
    body: JSON.stringify(data)
  }).then(likesP.innerText = `${newLikesT} Likes`)
  console.log(`You liked this ${divId}`)
}


form = document.querySelector("form.add-toy-form")
form.addEventListener("submit", sendData)

function sendData(e){
    e.preventDefault()
    let name = form['name'].value
    let image = form['image'].value
    let likes = 0
    let data = {
      name: form['name'].value,
      image: form['image'].value,
      likes: 0
    } 
    url = "http://localhost:3000/toys"
    fetch(url, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(renderToy(data))
    console.log("We're trying to submit data")
    console.log(e)
   }