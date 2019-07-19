const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {

})

function fetchTrainers() {
    return fetch(TRAINERS_URL)
    .then(response => response.json()) 
    .then(json => renderTrainers(json))

}

function renderTrainers(json) {
    json.forEach(trainer => {
        let divCard = document.createElement("div")
        divCard.className = "card"
        divCard.setAttribute("data-id", trainer.id)
        let para = document.createElement("p")
        para.innerText = trainer.name
        divCard.appendChild(para)
        let btn = document.createElement("button")
        btn.setAttribute("data-trainer-id", trainer.id)
        btn.innerText = "Add Pokemon"
        btn.addEventListener("click", newPokemonForm) 
        divCard.appendChild(btn)
        let ul = document.createElement("ul")
        trainer.pokemons.forEach(pokemon => {
            let li = document.createElement("li")
            li.innerText = pokemon.species + " (" + pokemon.nickname + ")"
            let pokebtn = document.createElement("button")
            pokebtn.className = "release"
            pokebtn.setAttribute("data-pokemon-id", pokemon.id)
            pokebtn.innerText = "Release"
            pokebtn.addEventListener("click", releasePokemon)
            li.appendChild(pokebtn)
            ul.appendChild(li)
        })
        divCard.appendChild(ul)
        document.querySelector("main").appendChild(divCard)
    });
    }
function newPokemonForm(e) {
    trainerId = e.target.dataset.trainerId
    let modal = document.getElementById("my-modal");
    modal.style.display = "block";
    let form = document.getElementById("create-pokemon-form");
    form.addEventListener("submit", addPokemon);
    let span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(e) {
        if (e.target ==modal) {
            modal.style.display = "none";
        }
    }
}

function addPokemon(e) {
    e.preventDefault()
    let trainerDiv = document.querySelector(`[data-id = '${trainerId}']`)
    let ul = trainerDiv.childNodes[2]
    let count = ul.childNodes.length
    console.log(count)
    if (count < 6) {
        let species = e.target[0].value
        let nickname = e.target[1].value
        e.target[0].value = ''
        e.target[1].value = ''
        createPokemon(species, nickname)
    } else {
        let error = "This trainer already has 6 pokemon."
        p = document.getElementById("error")
        setTimeout(function(){
            p.innerText = error
            p.style.color = "red"
        }, 2000);
        p.innerText = ''
    }


//later
    }
function createPokemon(species, nickname) {
    return fetch(POKEMONS_URL, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            species: species,
            nickname: nickname,
            trainer_id: trainerId
        })
    })
    .then(response => response.json())
    .then(json => appendNewPokemon(json))

}
    
function appendNewPokemon(json) {
    let modal = document.getElementById("my-modal");
    modal.style.display = "none";
    let trainerDiv = document.querySelector(`[data-id = '${json.trainer_id}']`)
    let ul = trainerDiv.childNodes[2]
    console.log(ul)
    let li = document.createElement("li")
    li.innerText = json.species + " (" + json.nickname + ")"
    let pokebtn = document.createElement("button")
    pokebtn.className = "release"
    pokebtn.setAttribute("data-pokemon-id", json.id)
    pokebtn.innerText = "Release"
    pokebtn.addEventListener("click", releasePokemon)
    li.appendChild(pokebtn)
    ul.appendChild(li)
}
    function releasePokemon(e) {
        // let trainerId = e.target.parentNode.parentNode.parentNode.dataset.id
        let pokeId = e.target.dataset.pokemonId
        return fetch(POKEMONS_URL + "/" + pokeId, {
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json'
            }, 
            body: JSON.stringify({
                id: pokeId
            })
        })
        .then(response => document.querySelector(`[data-pokemon-id="${pokeId}"]`).parentElement.remove()
       )
    }




fetchTrainers()


