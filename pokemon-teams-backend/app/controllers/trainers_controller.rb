class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
      trainer_data = trainers.map{|trainer| {id: trainer.id, name: trainer.name, pokemons: trainer.pokemons }}
    render json: trainer_data, except: [:created_at, :updated_at]
  end
end
