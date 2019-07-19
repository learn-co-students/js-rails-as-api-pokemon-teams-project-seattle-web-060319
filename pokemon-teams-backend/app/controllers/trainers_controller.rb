class TrainersController < ApplicationController

  def index
    @trainers = Trainer.all
    render json: @trainers
  end

  def show
    @trainer = Trainer.find(params[:id])
    @pokemons = @trainer.pokemons
    render json: [{trainer: @trainer}, {pokemons: @pokemons}]
  end


end
