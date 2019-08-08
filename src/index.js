const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function(){
  fetchToys()

  //event listener for adding new doll
  document.querySelector("form").addEventListener("submit", submitHandler)

  




  


  

});

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

function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toyArr=>  {
    toyArr.forEach(showToy)
  })
}

function showToy(toy){
  let toyDiv = document.createElement("div")
  
  toyDiv.classList.add("card")
  document.querySelector("#toy-collection").appendChild(toyDiv)

  // H2-TAG for toyname
  let toyName = document.createElement("h2")
  toyDiv.appendChild(toyName)
  toyName.innerText = toy.name

  // give toyDiv dataset like info
  toyDiv.dataset.likes = toy.likes

  // IMG tag for toy
  let toyPic = document.createElement("img")
  toyDiv.appendChild(toyPic)
  toyPic.src = toy.image
  toyDiv.id = `toy-${toy.id}`
  toyPic.classList.add("toy-avatar")

  //p tag for the number of likes per toy
  let toyLikes = document.createElement("p")
  toyDiv.appendChild(toyLikes)
  toyLikes.innerText = `${toyDiv.dataset.likes} likes`

  let likeButton = document.createElement("button")
  toyDiv.appendChild(likeButton)
  likeButton.innerText = "Like"
  likeButton.classList.add("like-btn")
  likeButton.addEventListener("click", addLike)

   //button to delete toy]
   let deleteButton = document.createElement("button")
   toyDiv.appendChild(deleteButton)
   deleteButton.innerText = "Delete Toy"
   deleteButton.classList.add("like-btn")
   deleteButton.addEventListener("click", deleteToy)
 
  }

 
  function submitHandler(event){
    event.preventDefault()
    let data = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then( showToy)

  }

  function addLike(event){
    let id = parseInt(event.target.parentElement.id.split("-")[1])
    let currentLikes = parseInt(event.target.parentElement.dataset.likes)
    event.preventDefault()
    let data ={
      likes: (currentLikes + 1)
    }
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then( resp => resp.json())
    .then( (data) => {
      console.log(data)
      let toyLikes = event.target.parentElement.children[2]
      toyLikes.innerText = `${data.likes} Likes`
      event.target.parentElement.dataset.likes  = data.likes

    } )
    
  }

  function deleteToy(event){
    let id = parseInt(event.target.parentElement.id.split("-")[1])
    event.preventDefault()
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
    }).then(res => res.json())
    .then(() => {
      document.getElementById(`toy-${id}`).remove()
    })
  }

 