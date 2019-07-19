const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(){
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(json => renderTrainers(json))
})

function renderTrainers(arr) {
  arr.forEach(trainer => {
    renderTrainer(trainer)
  });
}

function renderTrainer(trainer){
  let card = document.createElement('div');
  card.className = 'card'
  card.innerHTML = `<p>${trainer.name}</p>`
  card.setAttribute('data-id', trainer.id);
  let addPokeButton = document.createElement('button');
  addPokeButton.innerText = 'Add Pokemon'
  addPokeButton.setAttribute('data-trainer-id', trainer.id);
  let pokeList = document.createElement('ul');
  card.appendChild(addPokeButton);
  card.appendChild(pokeList);
  document.querySelector('main').appendChild(card);
  getPokemons(pokeList, trainer)
}

function getPokemons(pokeList, trainer) {
  fetch(TRAINERS_URL + `/${trainer.id}`).then(response => response.json()).then(json => {
    renderPokemon(json[1].pokemons)
  })
}

