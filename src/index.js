const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let form = document.querySelector(".add-toy-form")

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



// OR HERE!


document.addEventListener('DOMContentLoaded', function(){
  toyForm.addEventListener("submit", submitToy)
  getAllToys()
})

function getAllToys(){
 fetch("http://localhost:3000/toys")
 .then(response => response.json())
 .then(toyArray => {
    toyArray.forEach(makeToy)
        })
 }
 
 
 function submitToy(e){
     e.preventDefault()
     let data = {
      name: e.target[0].value,
      image: e.target[1].value,
      likes: "0"
     }
     fetch("http://localhost:3000/toys",{
         method: "POST",
         headers: { 'content-type': 'application/json'},
          body: JSON.stringify(data)
     } )
     .then(res => res.json())
     .then(makeToy)
     toyForm.style.display = 'none'
      form[0].value = ''
      form[1].value = ''
}

function makeToy(toy){
  let toyDiv = document.createElement('div')
  let toyName = document.createElement('h2')
  document.querySelector("#toy-collection").appendChild(toyDiv)
  toyName.innerText = toy.name
  toyDiv.appendChild(toyName)
  toyDiv.className = "card"
  toyDiv.id = toy.id
  toyImg = document.createElement('img')
  toyDiv.appendChild(toyImg)
  toyImg.src = toy.image
  toyImg.className = 'toy-avatar'
  toyLikes = document.createElement('p')
  toyDiv.appendChild(toyLikes)
  toyLikes.innerText = `${toy.likes} likes`
  toyBut = document.createElement('button')
  toyBut.className = "like-btn"
  toyDiv.appendChild(toyBut)
  toyBut.innerText = "Like"
  
  
  toyBut.addEventListener("click", editLikes)
   
  
}
    function editLikes(e){
      //  debugger
      num = parseInt(e.target.parentElement.querySelector('p').innerText.split(" ")[0])
      let data = {
        likes: num += 1
      }
      fetch(`http://localhost:3000/toys/${e.target.parentElement.id}`,  {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json)
      .then(() =>{
  
      e.target.parentElement.querySelector('p').innerText = `${num} likes`
      
    })
    
    }