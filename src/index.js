document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyButton = document.querySelector('.container');
  let addToy = false;

  addBtn.addEventListener('click', () => {
    addToy = !addToy;
    if (addToy) {
      toyButton.style.display = 'block';
    } else {
      toyButton.style.display = 'none';
    }
  });

  // new toy form event listener
  const toyForm = document.querySelector('.add-toy-form');
  toyForm.addEventListener('submit', createNewToy);

  // fetch all toys from db on dom load
  fetch(`http://localhost:3000/toys`)
    .then(res => res.json())
    .then(toys => toys.forEach(renderToy));
});

function renderToy(toy) {
  // renders one toy to the dom grid
  const toyContainer = document.querySelector('#toy-collection');
  const toyCard = document.createElement('div');
  toyCard.id = `toy-${toy.id}`;
  toyCard.classList.add('card');
  toyCard.innerHTML = `
    <img src=${toy.image} alt="Image for ${toy.name}" />
    <h2>${toy.name}</h2>
    <div>
      <p>${toy.likes}</p>
      <button class="like-btn">❤️</button>
    </div>
  `;
  toyContainer.appendChild(toyCard);

  likeBtn = document.querySelector(`#toy-${toy.id} button`);
  likeBtn.addEventListener('click', likeToy);
}

function createNewToy(e) {
  // creates a new toy, persists it to the db and renders it to the dom
  e.preventDefault();
  data = {
    name: e.target[0].value,
    image: e.target[1].value,
    likes: 0,
  };

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(renderToy);
}

function updateToyLikes(toy) {
  // updates the like count in the dom
  toyEl = document.querySelector(`#toy-${toy.id}`);
  toyEl.children[2].children[0].innerText = toy.likes;
  if (toyEl.querySelector('.like-btn').classList.contains('liked')) {
    toyEl.querySelector('.like-btn').classList.remove('liked');
  } else {
    toyEl.querySelector('.like-btn').classList.add('liked');
  }
}

function likeToy(e) {
  // persists likes to the db
  toy = e.target.parentElement.parentElement;
  if (!toy.querySelector('.like-btn').classList.contains('liked')) {
    toyId = toy.id.split('-')[1];
    toyLikes = parseInt(toy.children[2].children[0].innerText, 10) + 1;
    data = {
      likes: toyLikes,
    };

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(toy => updateToyLikes(toy));
  } else {
    toyId = toy.id.split('-')[1];
    toyLikes = parseInt(toy.children[2].children[0].innerText, 10) - 1;
    data = {
      likes: toyLikes,
    };

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(toy => updateToyLikes(toy));
  }
}
