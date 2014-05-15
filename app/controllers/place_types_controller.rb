class PlaceTypesController < ApplicationController

  def index
    @place_types = PlaceType.all
  end
end
