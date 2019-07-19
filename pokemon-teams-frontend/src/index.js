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
  getPokemons(trainer)
}

function getPokemons(trainer) {
  fetch(TRAINERS_URL + `/${trainer.id}`).then(response => response.json()).then(json => {
    renderPokemon(json)
  })
}

function renderPokemon(trainer){
  let trainerId = '[data-id="' + trainer[0].trainer.id + '"]'
  let card = document.querySelector(`${trainerId}`)
  let list = card.querySelector('ul')
  trainer[1].pokemons.forEach(pokemon => {
    let li = document.createElement('li');
    li.innerText = `${pokemon.nickname} (${pokemon.species})`;
    list.appendChild(li)
    let releaseButton = document.createElement('button');
    releaseButton.className = 'release';
    releaseButton.setAttribute('data-pokemon-id', pokemon.id)
    releaseButton.innerText = 'Release!'
    li.appendChild(releaseButton);
  });
}