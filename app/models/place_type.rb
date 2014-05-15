class PlaceType < ActiveRecord::Base
  has_many :neighborhood_place_types
end