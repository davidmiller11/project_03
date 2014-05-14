class WelcomeController < ApplicationController
  def index
    @neighborhoods = Neighborhood.all
  end
end
