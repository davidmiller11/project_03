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
PlaceType.delete_all
NeighborhoodPlaceType.delete_all
Challenge.delete_all
User.delete_all

Challenge.create({
  player_name: 'DMills',
  hood_name: 'East Village',
  place_type: 'Bar',
  score_avg: '87.3'
});

Challenge.create({
  player_name: 'pjwl33',
  hood_name: 'East Village',
  place_type: 'Restaurant',
  score_avg: '82.9'
});

Challenge.create({
  player_name: 'Shook_Star',
  hood_name: 'Flatiron District',
  place_type: 'Cafe',
  score_avg: '26.8'
});

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
  radius: 640, # meters
  zoom: 15
});

manhattan.neighborhoods.create({
  name: 'Flatiron District',
  lat: 40.741,
  lng: -73.989,
  radius: 350, # meters
  zoom: 16
});

manhattan.neighborhoods.create({
  name: 'West Village',
  lat: 40.735,
  lng: -74.005,
  radius: 800, # meters
  zoom: 15
});

PlaceType.create({name: 'Bar'});
PlaceType.create({name: 'Restaurant'});
PlaceType.create({name: 'Night Club'});
PlaceType.create({name: 'Cafe'});

for i in 0...Neighborhood.all.length do
  for j in 0...PlaceType.all.length do
    NeighborhoodPlaceType.create({
      neighborhood_id: Neighborhood.all[i].id,
      place_type_id: PlaceType.all[j].id
      })
  end
end
