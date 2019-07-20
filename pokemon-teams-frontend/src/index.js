const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function createTrainers() {
  return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTrainers(json));
};

function renderTrainers(json) {
  json.forEach(trainer =>
    {let trainerName = trainer.name;
     let trainerId = trainer.id;
     let pokemonsList = trainer.pokemons;

     createTrainerContainer(trainerName, trainerId, pokemonsList);

  })
}

function createTrainerContainer(trainerName, trainerId, pokemonsList) {
  const main = document.querySelector("main");
  const container = document.createElement("div");
  container.className = "card";
  container.setAttribute('data_id', trainerId);
  main.appendChild(container);
  // create children for container, p, button, ul
  const p = document.createElement('p');
  p.innerText = trainerName;
  container.appendChild(p);
  const button = document.createElement('button');
  button.setAttribute('data_trainer_id', trainerId);
  button.innerText = "Add Pokemon"
  container.appendChild(button);
  const ul = document.createElement('ul');
  container.appendChild(ul);
  //addEventListener to button
  button.addEventListener('click', addPokemon);
  // iterate pokemonlist and create button inside li for each
  pokemonsList.forEach( pokemon =>{
    const pokemonName = pokemon.nickname + " (" + pokemon.species + ")";
    const pokemonId = pokemon.id;
    const li = document.createElement('li');
    li.innerText = pokemonName;
    ul.appendChild(li);
    const releaseButton = document.createElement("button");
    releaseButton.setAttribute('data-pokemon-id', pokemonId);
    releaseButton.className = "release";
    releaseButton.innerText = "Release";
    li.appendChild(releaseButton);
    releaseButton.addEventListener('click', deletePokemon);
  })
}

function deletePokemon(e) {
  const pokemonId =  e.target.getAttribute("data-pokemon-id")
  fetch(POKEMONS_URL + '/' + pokemonId, {
    method: 'delete'
  }).then(response =>
    response.json())
    .then(json => 
      removePokemon(json));
}

function removePokemon(pokemon) {
  const buttons = document.getElementsByClassName("release")
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i]
    if (button.getAttribute("data-pokemon-id") == pokemon.id){
      button.parentElement.remove()
    }
  }
}

function addPokemon(e) {
  // e.preventDefault;
  const trainerId = e.target.getAttribute("data-trainer-id")
  const pokemonsList = e.target.nextSibling.querySelectorAll('li');
  const ul = e.target.nextSibling
  console.log(pokemonsList)
  if (pokemonsList.length < 6) {
    console.log(pokemonsList.length);
    return fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "trainer_id": trainerId
      })
    })
    .then(response => response.json())
    .then(json => createPokemon(json, ul));
  }else {
    alert("Max pokemon number")
  }
}

function createPokemon(pokemon, ul) {

  const pokemonName = pokemon.nickname + " (" + pokemon.species + ")";
  const pokemonId = pokemon.id;
  const li = document.createElement('li');
  li.innerText = pokemonName;
  ul.appendChild(li);
  const releaseButton = document.createElement("button");
  releaseButton.setAttribute('data-pokemon-id', pokemonId);
  releaseButton.className = "release";
  releaseButton.innerText = "Release";
  li.appendChild(releaseButton);
}

document.addEventListener("DOMContentLoaded", function() {
  createTrainers(); 
  
});

