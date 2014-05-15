class NeighborhoodPlaceType < ActiveRecord::Base
  belongs_to :neighborhood
  belongs_to :place_type
  has_many :places
end