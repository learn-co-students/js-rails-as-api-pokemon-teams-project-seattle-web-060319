class TrainersController < ApplicationController
    def index 
        trainers = Trainer.all
        pokemons = Pokemon.all
        render json: trainers, include: [:pokemons]
    end
end
