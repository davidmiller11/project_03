class Challenge < ActiveRecord::Base
  belongs_to :user
  belongs_to :neighborhood_place_type
end