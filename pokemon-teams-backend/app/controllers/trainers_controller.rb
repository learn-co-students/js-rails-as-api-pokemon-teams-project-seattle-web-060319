class TrainersController < ApplicationController
  def index
    @trainers = Trainer.all
    jawn = @trainers.map do |trainer|
      poke = {id: trainer.id, name: trainer.name, pokemons: trainer.pokemons}
    end
    render json: jawn , except:[:updated_at, :created_at]

  end



  def show
    @trainer = Trainer.find(params[:id])
    trainer = {id: @trainer.id, name: @trainer.name, pokemons: @trainer.pokemons}
    render json: trainer, except: [:updated_at, :created_at]
  end




end
