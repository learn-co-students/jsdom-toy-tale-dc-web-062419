const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

document.addEventListener("DOMContentLoaded", function(){
  fetchToys();
  document.querySelector(".add-toy-form").addEventListener("submit", submitToys);
})


function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    toys.forEach(renderToy)
  })
}


function renderToy(toy){
  const toysCollectionDiv = document.querySelector("#toy-collection")
  const toyDiv = document.createElement("div")
  toyDiv.classList.add("card")
  toysCollectionDiv.appendChild(toyDiv)
  const toyH2 = document.createElement("h2")
  toyH2.innerText = toy.name
  toyDiv.appendChild(toyH2)
  const toyImg = document.createElement("img")
  toyImg.setAttribute("src", `${toy.image}`)
  toyImg.classList.add("toy-avatar")
  toyDiv.appendChild(toyImg)
  const toyP = document.createElement("p")
  toyP.innerText = `${toy.likes} Likes`
  toyDiv.appendChild(toyP)
  const toyButton = document.createElement("button")
  toyButton.classList.add("like-btn")
  toyButton.innerText = "Like <3"
  toyDiv.appendChild(toyButton)
  toyButton.addEventListener("click", event => likeToy(toy))
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


function submitToys(event){
  event.preventDefault()
  let data = {
    name: event.target["name"].value,
    image: event.target["image"].value,
    likes: 0
  }
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    Accept: "application/json",
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(renderToy)
  }


function likeToy(toy){
  let data = {
    likes: toy.likes += 1
  }
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    Accept: "application/json",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(toy => renderToy())
}