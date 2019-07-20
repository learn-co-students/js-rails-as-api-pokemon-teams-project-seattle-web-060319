class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    pokemon_data = pokemons.map{|pokemon| {id: pokemon.id, nickname: pokemon.nickname, species: pokemon.species, trainer_id: pokemon.trainer_id }}
    render json: pokemon_data, except: [:created_at, :updated_at]
  end

  def show
    pokemon = Pokemon.find(params[:id])
    render json: pokemon, except: [:created_at, :updated_at]
  end

  # def new
  #   pokemon = Pokemon.new
  # end
  
  def create
    name = Faker::Games::Pokemon.name
    species = ["Mewto", "Mew", "Pikachu", "Bulbasaur", "Snorlax", "Charizard", "Weedle", "Ekans",  "Persian",  "Zubat", "Arcanine"].sample
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    render json: pokemon, except: [:created_at, :updated_at]
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    render json: pokemon, except: [:created_at, :updated_at]
    pokemon.destroy
  end
end
