# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Place.delete_all
Neighborhood.delete_all
City.delete_all

manhattan = City.create({
  name: 'Manhattan',
  lat: 40.741,
  lng: -73.989,
  radius: 5000 # meters
});

manhattan.neighborhoods.create({
  name: 'East Village',
  lat: 40.726,
  lng: -73.983,
  radius: 640 # meters
});

manhattan.neighborhoods.create({
  name: 'Flatiron District',
  lat: 40.741,
  lng: -73.989,
  radius: 350 # meters
});