document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  const realToyForm = document.querySelector(".add-toy-form")
  const toyCollectionEl = document.getElementById("toy-collection");
  const submitButton = document.querySelector(".submit")
  let toyCollection;
  let addToy = false;

  function fetchToys() {
    fetch("http://localhost:3000/toys")
      .then(resp => resp.json())
      .then(makeCards)
  }

  function makeCards(data){
    data.forEach(toy => {
      renderToy(toy)
    })
  }

  function makeCard(toy){
    renderToy(toy);
    toyForm.style.display = 'none';
  }

  function renderToy(toy){
    const newDiv = document.createElement("div")
    newDiv.className = "card"
    toyCollectionEl.appendChild(newDiv)
    const newH2 = document.createElement("h2")
    newH2.innerText = toy.name
    newDiv.appendChild(newH2)
    const newImg = document.createElement("img")
    newImg.src = toy.image
    newImg.className = "toy-avatar"
    newDiv.appendChild(newImg)
    const newButton = document.createElement("button")
    newButton.innerText = "Like <3"
    newButton.className = "like-button"
    newButton.addEventListener("click", updateLikes)
    newDiv.appendChild(newButton)
    const newP = document.createElement("p")
    newP.className = `${toy.id}`
    newP.innerText = `${toy.likes} Likes`
    newDiv.appendChild(newP)
  }

  function updateLikes(e){
    const likeTextElement = e.target.parentElement.querySelector("p");
    let likes = Number(likeTextElement.innerText.split(" ")[0]);
    likes++
    const id = likeTextElement.className;
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json",
                "Accept": "application/json"
      },
      body: JSON.stringify({"likes": `${likes}`})
    })
    .then(resp => resp.json())
    .then(() => {likeTextElement.innerText = `${likes} Likes`})
  }

  fetchToys()

  realToyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let data = {
      name: e.target[0].value,
      image: e.target[1].value,
      likes: 0
    }
    if (!!data.name && !!data.image) {
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      .then(resp => resp.json())
      .then(makeCard(data))
    } else {
      alert("Please provide a name and an image URL.")
    }
  })

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
})
