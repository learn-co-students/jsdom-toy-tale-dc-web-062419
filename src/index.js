const addBtn = document.querySelector('#new-toy-btn')
const toyFormContainer = document.querySelector('.container')
const toyForm = document.querySelector(".add-toy-form")
const toyURL = "http://localhost:3000/toys"
let addToy = false


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormContainer.style.display = 'block'
  } else {
    toyFormContainer.style.display = 'none'
  }
})

document.addEventListener("DOMContentLoaded", loadToys)
toyForm.addEventListener("submit", processForm)

function loadToys() {
    fetch(toyURL)
        .then(response => response.json())
        .then(function(json) {
            for (toyInfo of json) {
                makeCard(toyInfo)
            }
        })
}

function makeCard(toyInfo) {
    let toyList = document.getElementById("toy-collection")
    let card = document.createElement("div")
    card.className = "card"
    card.id = toyInfo["id"]
    toyList.appendChild(card)
    let title = document.createElement("h2")
    title.textContent = toyInfo["name"]
    card.appendChild(title)
    let pic = document.createElement("img")
    pic.src = toyInfo.image
    pic.className = "toy-avatar"
    card.appendChild(pic)
    let likeTag = document.createElement("p")
    likeTag.textContent = formatLikes(toyInfo["likes"])
    card.appendChild(likeTag)
    let likeButton = document.createElement('button')
    likeButton.textContent = "Like <3"
    likeButton.className = "like-btn"
    likeButton.addEventListener("click", (e) => addLike(e, toyInfo, likeTag))
    card.appendChild(likeButton)
}

function formatLikes(likeNumber) {
    if (likeNumber === 1 || likeNumber === -1) {
        return `${likeNumber} Like`
    } else {
        return `${likeNumber} Likes`
    }
}

function processForm(e) {
    e.preventDefault()
    let newToyInfo = {...Object.fromEntries(
                new FormData(e.target).entries()),
                likes: 0}
    fetch(toyURL, {
        method: "POST",
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
            newToyInfo)
        })
    makeCard(newToyInfo)
    toyForm.reset()

}

function addLike(e, toyInfo, likeTag) {
    let id = toyInfo["id"]
    let likes = ++toyInfo["likes"]
    let patchUrl = toyURL + "/" + id 
    fetch(patchUrl, 
        {method: "PATCH",
                headers: 
                {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify(toyInfo)})
    likeTag.textContent = formatLikes(likes)
}