class WelcomeController < ApplicationController
  def index
    @neighborhoods = Neighborhood.all
    @place_types = PlaceType.all
  end
end
