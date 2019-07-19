class PokemonsController < ApplicationController

    def index
    end

    def create 
        pokemon = Pokemon.new(params.require(:pokemon).permit(:species, :nickname, :trainer_id))
        if pokemon.save
            render json: pokemon
        else
            render :json => { :errors =>
            pokemon.errors.full_messages }
        end
    end

    def show
    end


    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        head :no_content 
    end
end
