class City < ActiveRecord::Base
  has_many :neighborhoods
  has_many :places, through: :neighborhoods
end