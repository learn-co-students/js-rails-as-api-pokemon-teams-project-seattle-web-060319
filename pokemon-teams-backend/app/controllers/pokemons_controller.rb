class PokemonsController < ApplicationController
  def index
    @pokemons = Pokemon.all
    pokerender = @pokemons.map{|pokemon| pokemone = {id: pokemon.id, nickname:pokemon.nickname, species: pokemon.species, trainer_id: pokemon.trainer_id}}
    render json: pokerender, except: [:created_at, :updated_at]
  end


  def show
    @pokemon = Pokemon.find(params[:id])
    render json: @pokemon, except: [:created_at, :updated_at]
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    @pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    render json: @pokemon, except: [:created_at, :updated_at]
  end

  def destroy
    @pokemon = Pokemon.find(params[:id])
    render json: @pokemon, except: [:created_at, :updated_at]
    @pokemon.destroy
  end

end
