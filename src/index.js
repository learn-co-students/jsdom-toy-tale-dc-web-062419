const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function(){
document.querySelector("form").addEventListener("submit", submitHandler)
fetchAllToys()
})

function submitHandler(event){
 event.preventDefault()

let data = {
  name: event.target[0].value,
  image: event.target[1].value,
  likes: event.target[2].value,

}
fetch("http://localhost:3000/toys", {
   method: "POST",
   headers: {'Content-Type': 'application/json'},
   body: JSON.stringify(data)
 })
 .then(res => res.json())
 .then(   renderToy )

}

function fetchAllToys(){
 fetch("http://localhost:3000/toys")
 .then(response => response.json())
 .then(toysArray => {
   toysArray.forEach( renderToy )
 })
}
function renderToy(toy){
 // creating card for each toy
 let toyDiv = document.createElement("div")
 toyDiv.classList.add("card")
 document.querySelector("#toy-collection").appendChild(toyDiv)
 toyDiv.id = `toy-${toy.id}`

 //create delete button
 let deleteButton = document.createElement("button")
 deleteButton.innerText = "Delete Toy"
 toyDiv.appendChild(deleteButton)
 deleteButton.id = `delete-${toy.id}`
 deleteButton.addEventListener("click", deleteToy)

 // creating h2 for each name
 let tName = document.createElement("h2")
 toyDiv.appendChild(tName)
 tName.innerText = toy.name
 //creating img for each
 let tImage = document.createElement("img")
 toyDiv.appendChild(tImage)
 tImage.src  = toy.image
 tImage.classList.add("toy-avatar")
 //creating likes p
 let tp = document.createElement("p")
 toyDiv.appendChild(tp)
 tp.classList.add('likes')
 tp.id = `likes-${toy.id}`
 tp.innerText = `Number of likes: ${toy.likes}`
 //creating likes button
 let tButton = document.createElement("BUTTON")
 toyDiv.appendChild(tButton)
 tButton.classList.add("like-btn")
 tButton.id = `toyButton-${toy.id}`
 tButton.innerText ="Like ❤️"
 tButton.addEventListener("click", likeToy)

}
document.getElementById("range").addEventListener("change", setLikes)

function likeToy(event){
 let id = event.currentTarget.id.split("-")[1]
 let toy = document.getElementById(`likes-${id}`)
 let likesCount = parseInt(toy.innerText.split(":")[1])
 let data = {likes: `${likesCount + 1}`}
 toy.innerText = `Number of likes: ${likesCount + 1}`
 fetch(`http://localhost:3000/toys/${id}`, {
   method: "PATCH",
   headers: {'Content-Type': 'application/json'},
   body: JSON.stringify(data)
 }).then(res => res.json())
 .then(() => {

 })
 .catch(() => {
   alert("Error, try again later")
 })
}

function deleteToy(event){
  let id = event.currentTarget.id.split("-")[1]
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "DELETE"
  }).then(res => res.json())
  .then(() => {
    document.getElementById(`toy-${id}`).remove()
  })
  .catch(() => {
    alert("Error, try again later")
  })
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

function updateTextInput(val) {
 document.getElementById('textInput').value=val;
}

function setLikes(event){
 let id = event.currentTarget.id.split("-")[1]
 let toy = document.getElementById(`likes-${id}`)
 let likesCount = parseInt(toy.innerText.split(":")[1])
 let range = document.querySelector("range").value
 let data = {likes: `${range}`}
 toy.innerText = `Number of likes: ${range}`
 fetch(`http://localhost:3000/toys/${id}`, {
   method: "post",
   headers: {'Content-Type': 'application/json'},
   body: JSON.stringify(data)
 }).then(res => res.json())
 .then(() => {

 })
 .catch(() => {
   alert("Error, try again later")
 })
}