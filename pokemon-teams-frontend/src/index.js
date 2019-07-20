const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

//main function
/* main function goals
-render info from api onto the page
  - fetch the trainer's info as a json hash
  -calling the create trainer card function using this info to display
    trainers and their pokemon.
*/

  fetch(TRAINERS_URL)   // fetch (api)
  .then(res => res.json()) // take response make it a json hash using json function
  .then(trainers => { //take the json hash and do this with it
    createTrainerCards(trainers) //creating trainer cards which will displayed on the webpage
  }) // end
/*
| trainers
| is
| passed down
V
*/

//create card
/*
  -take all the trainers takes each "trainer" and pass it through a function that
  creates a single card per trainer
*/
function createTrainerCards(trainers){
  trainers.forEach(function(trainer){
    createTrainerCard(trainer)
  })
  }

/* 1 trainer's info passed down
*/


//create trainer card
/*
  - take the each trainer's info and displays it as a card with
    - 1 div
      -p element
        -trainer's name
      -class name "card"
      -attribute "data-id" = trainer's id
    - 1 button
      - has an event listener that add's pokemon to the team
    - List
      - each pokemon
        - button
          -has an event listener that removes THAT pokemon from the team
    -Card ends here
*/


/* 1 trainer's info passed down
*/


  function createTrainerCard(trainer){
    const div = document.createElement("div")
    const nameT = document.createElement("p")
    nameT.innerText = trainer.name
    div.className = "card"
    div.setAttribute('data-id', trainer.id) // custom attribute
    const addPokemon = document.createElement("button")
    addPokemon.setAttribute('data-trainer-id', trainer.id)
    addPokemon.innerText = "Add Pokemon"
    addPokemon.addEventListener("click", fetchaPokemon)
    //first jump
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
//fetch a pokemon
/*
  - POST fetch function because we are adding pokemon
*/
  function fetchaPokemon(e){
    const trainer_id = e.target.getAttribute("data-trainer-id") // using element attribute to compare to Trainer's ID
    const list = e.target.nextSibling //selecting the UL element
    const pokemonTeam = list.children //Selecting the LI element's
    if (pokemonTeam.length < 6){ // Writing an if Function limiting pokemon team to 6 members
/*
  POST fetch
    - fetch using the POKEMON_URL from the api for pokemons
    - call POST method
    - chainging the trainer_id of the pokemon to the trainer's team it has just been added to
*/
    fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify( {
        'trainer_id': trainer_id
      })
    })
    .then(res => res.json()) // taking the pokemon
    .then(pokemon => addpokemontoTeam(pokemon)) // adding pokemon to the TEAM
  }
  //jump 2
  else {
    alert("Team is full (Max = 6)")
  }
}

//add to the fetched pokemon to team
/* pokemon goes down here */
/*
  take the pokemon we got
    - creates a li element in the trainer's UL element
      - have a button that can release the pokemon
        - has event that releases the selected pokemon on click
        - carry the pokemon id as an attribute
    - pokemon species as the name of the pokemon
*/
/* Pokemon arrives at the display function */
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

// finds the card of the trainer and appends the pokemon item to that card
    for(const card of cards){
      if (card.getAttribute("data-id") == pokemon.trainer_id){
        card.children[2].appendChild(pokeItem)
      }
    }
  }

//release pokemon
/* DELETE fetch request
  -fetch the pokemon and its trainer id in the backend from the database
  - and remove that pokemon from that trainer's posession
 */
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
/*
  Takes the pokemon json and deletes it from the front end display card
*/

function removeFromTeam(pokemon){
    debugger;
  const buttons = document.getElementsByClassName("release")
// find the release button and remove the pokemon item parent by its id
  for (i = 0; i < buttons.length; i++) {
    button = buttons[i]
    if (button.getAttribute("data-pokemon-id") == pokemon.id){
      button.parentElement.remove()
    }
  }
}

/*This is the end*/
