const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")


fetch(TRAINERS_URL)
.then(res => res.json())
.then(json => {
  createTrainerCards(json)
})
//create card
function createTrainerCards(trainers){
  for (let i = 0; i < trainers.length; i++) {
    const trainer = trainers[i]
    createTrainerCard(trainer)
  }
}

//create trainer card
  function createTrainerCard(trainer){

    const div = document.createElement("div")
    const nameT = document.createElement("p")
    nameT.innerText = trainer.name
    div.className = "card"
    div.setAttribute('data-id', trainer.id)
    const addPokemon = document.createElement("button")
    addPokemon.setAttribute('data-trainer-id', trainer.id)
    addPokemon.innerText = "Add Pokemon"
    addPokemon.addEventListener("click", addaPokemon)
    const ul = document.createElement("ul")

    for (let i = 0; i < trainer.pokemons.length; i++) {
      const pokemon = trainer.pokemons[i]
      const pokeItem = document.createElement("li")
      pokeItem.innerText = pokemon.nickname + " (" + pokemon.species + ") "
      const releasePokemon = document.createElement("button")
      releasePokemon.addEventListener("click", releaseaPokemon)
      releasePokemon.innerText = "Release"
      releasePokemon.className = "release"
      releasePokemon.setAttribute('data-pokemon-id', pokemon.id)
      pokeItem.appendChild(releasePokemon)
      ul.appendChild(pokeItem)
    }
    div.appendChild(nameT)
    div.appendChild(addPokemon)
    div.appendChild(ul)
    main.appendChild(div)
  }
//add a pokemon
  function addaPokemon(e){
    const trainer_id = e.target.getAttribute("data-trainer-id")
    const list = e.target.nextSibling
    if (list.children.length < 6){
    fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify( {
        'trainer_id': trainer_id
      })
    })
    .then(res => res.json())
    .then(pokemon => addpokemontoTeam(pokemon))
  }
  else {
    alert("Team is full (Max = 6)")
  }
}

//add to team
  function addpokemontoTeam(pokemon){
    const pokeItem = document.createElement("li")
    pokeItem.innerText = pokemon.nickname + " (" + pokemon.species + ") "
    const releasePokemon = document.createElement("button")
    releasePokemon.addEventListener("click", releaseaPokemon) //event listener
    releasePokemon.innerText = "Release"
    releasePokemon.className = "release"
    releasePokemon.setAttribute('data-pokemon-id', pokemon.id)
    pokeItem.appendChild(releasePokemon)
    const cards = document.querySelectorAll(".card")
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      if (card.getAttribute("data-id") == pokemon.trainer_id){
        card.children[2].appendChild(pokeItem)
      }
    }
  }

//release pokemon

function releaseaPokemon(e){
  const pokemonid =  e.target.getAttribute("data-pokemon-id")
  fetch(POKEMONS_URL + "/" + pokemonid, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(pokemon => removeFromTeam(pokemon))
}

//removeFromTeam

function removeFromTeam(pokemon){
  const buttons = document.getElementsByClassName("release")
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i]
    if (button.getAttribute("data-pokemon-id") == pokemon.id){
      button.parentElement.remove()
    }
  }
}
