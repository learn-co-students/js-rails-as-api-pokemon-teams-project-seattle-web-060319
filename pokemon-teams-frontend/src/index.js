const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', {
  fetch(TRAINERS_URL).then(response => response.json()).then(json => console.log(json))
})

function renderTrainer(trainer){
  let card = document.createElement('div');
  card.className = 'card'
  card.setAttribute('data-id', trainer.id);
  let addPokeButton = document.createElement('button');
  addPokeButton.setAttribute('data-trainer-id', trainer.id);
  let pokeList = document.createElement('ul');
  card.appendChild(addPokeButton);
  card.appendChild(pokeList);
  document.querySelector('main').appendChild(card);

}