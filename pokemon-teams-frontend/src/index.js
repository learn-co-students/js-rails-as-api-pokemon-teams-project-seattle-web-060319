const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

document.addEventListener("DOMContentLoaded", function() {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => renderTrainers(json));
});

function renderTrainers(arr) {
  arr.forEach(trainer => {
    renderTrainer(trainer);
  });
}

function renderTrainer(trainer) {
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<p>${trainer.name}</p>`;
  card.setAttribute("data-id", trainer.id);
  let addPokeButton = document.createElement("button");
  addPokeButton.innerText = "Add Pokemon";
  addPokeButton.setAttribute("data-trainer-id", trainer.id);

  //add pokemon button event listener
  addPokeButton.addEventListener("click", function(e) {
    if (e.target.parentNode.querySelectorAll("li").length < 6) {
      return fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          trainerId: e.target.parentNode.attributes[1].nodeValue
        })
      })
        .then(response => response.json())
        .then(json => renderPokemonLi(json));
    } else {
      // show error modal
      showErrorModal();
    }
  });

  let pokeList = document.createElement("ul");
  card.appendChild(addPokeButton);
  card.appendChild(pokeList);
  document.querySelector("main").appendChild(card);
  getPokemons(trainer);
}

function showErrorModal() {
  let modal = document.getElementById("myModal");
  let span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function() {
    modal.style.display = "none";
  };
  window.onclick = function(e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };
}

function getPokemons(trainer) {
  fetch(TRAINERS_URL + `/${trainer.id}`)
    .then(response => response.json())
    .then(json => {
      renderPokemon(json);
    });
}

function renderPokemon(trainer) {
  trainer[1].pokemons.forEach(pokemon => {
    renderPokemonLi(pokemon);
  });
}

function renderPokemonLi(pokemon) {
  let trainerId = '[data-id="' + pokemon.trainer_id + '"]';
  let card = document.querySelector(`${trainerId}`);
  let list = card.querySelector("ul");
  let li = document.createElement("li");
  li.innerText = `${pokemon.nickname} (${pokemon.species})`;
  list.appendChild(li);
  let releaseButton = document.createElement("button");
  releaseButton.className = "release";
  releaseButton.setAttribute("data-pokemon-id", pokemon.id);
  releaseButton.innerText = "Release!";
  li.appendChild(releaseButton);

  // adding the event listener to the release button
  releaseButton.addEventListener("click", function(e) {
    return fetch(
      POKEMONS_URL + `/${e.target.attributes["data-pokemon-id"].nodeValue}`,
      { method: "DELETE" }
    )
      .then(response => response.json)
      .then(() => li.remove());
  });
}
